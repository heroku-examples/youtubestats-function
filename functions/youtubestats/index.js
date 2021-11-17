import { google } from "googleapis";
const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY
});

/**
 * YouTubeStats Function
 * This function receives a playlist id, retrieves its videos, and store each video statistics in Salesforce
 *
 * The exported method is the entry point for your code when the function is invoked.
 *
 * Following parameters are pre-configured and provided to your function on execution:
 * @param event: represents the data associated with the occurrence of an event, and
 *                 supporting metadata about the source of that occurrence.
 * @param context: represents the connection to Functions and your Salesforce org.
 * @param logger: logging handler used to capture application logs and trace specifically
 *                 to a given execution of a function.
 */
export default async function (event, context, logger) {
  logger.info(
    `Invoking YouTubeStats with payload ${JSON.stringify(event.data || {})}`
  );

  const playlistId = event.data.playlistId;

  if (!playlistId) {
    throw new Error("Missing playlistId parameter");
  }

  // 1. Retrieves the videos from a playlis using the googleapis library
  logger.info(`Retrieving PlaylistItems with ID = ${playlistId}`);
  const { data: playlistItems } = await youtube.playlistItems.list({
    part: "contentDetails,snippet",
    playlistId
  });

  // 2. Creates a list with video objects containing: title, description, and videoId
  const videos = playlistItems.items.map((video) => {
    return {
      videoId: video.contentDetails.videoId,
      title: video.snippet.title,
      description: video.snippet.description
    };
  });

  // 3. Retrieves the video statistics from every video using the googleapis library
  logger.info(`Getting Video Stats`);
  const { data: videoStats } = await youtube.videos.list({
    part: "statistics",
    id: videos.map((video) => video.videoId).join(",")
  });

  // 4. Maps the statistics to the list of video objects
  const stats = {};
  for (const stat of videoStats.items) {
    stats[stat.id] = stat.statistics;
  }

  // Creating a table to store the referenceId by Video ID
  const referenceTable = new Map();

  // 5. Uses the Unit of Work pattern to register the creation of each Video object into Salesforce
  const uow = context.org.dataApi.newUnitOfWork();

  for (const video of videos) {
    logger.info(`Creating Video with ID: ${video.videoId}`);
    const referenceId = uow.registerCreate({
      type: "Video__c",
      fields: {
        Video_ID__c: video.videoId,
        Name: video.title,
        Description__c: video.description,
        View_Count__c: stats[video.videoId].viewCount,
        Like_Count__c: stats[video.videoId].likeCount,
        Dislike_Count__c: stats[video.videoId].dislikeCount,
        Favorite_Count__c: stats[video.videoId].favoriteCount,
        Comment_Count__c: stats[video.videoId].commentCount
      }
    });
    referenceTable.set(video.videoId, referenceId);
  }

  // 6. Commits the Unit of Work as one single operation
  const response = await context.org.dataApi.commitUnitOfWork(uow);

  // 7. Maps the result containing the Salesforce id and the videoId
  const results = [];
  for (const [videoId, referenceId] of referenceTable.entries()) {
    const result = {
      id: response.get(referenceId).id,
      videoId
    };
    results.push(result);
  }

  return results;
}
