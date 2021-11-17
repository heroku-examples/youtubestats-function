// Fixtures
const playlistItems = {
  data: {
    kind: "youtube#playlistItemListResponse",
    etag: "QDWNG5XxTT5JUeFUinaHPcYJ28k",
    items: [
      {
        kind: "youtube#playlistItem",
        etag: "0xLBJyaSkiJ5a5-gLNJlJ_IpkMY",
        id: "UExnSU1RZTJQS1BTTE5YczhBR3B4Z0dibWs4WWxwX1dUUC41NkI0NEY2RDEwNTU3Q0M2",
        snippet: {
          publishedAt: "2021-05-03T18:51:40Z",
          channelId: "UCKORm8sxh3cheBpqs0akkhg",
          title: "Introduction to Node.js for Salesforce Developers | codeLive",
          description:
            "Let's learn about Node.js, a JavaScript runtime for writing server-side applications, and why it matters to us as Salesforce Developers.",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/TLflnAJx_KA/default.jpg",
              width: 120,
              height: 90
            },
            medium: {
              url: "https://i.ytimg.com/vi/TLflnAJx_KA/mqdefault.jpg",
              width: 320,
              height: 180
            },
            high: {
              url: "https://i.ytimg.com/vi/TLflnAJx_KA/hqdefault.jpg",
              width: 480,
              height: 360
            },
            standard: {
              url: "https://i.ytimg.com/vi/TLflnAJx_KA/sddefault.jpg",
              width: 640,
              height: 480
            },
            maxres: {
              url: "https://i.ytimg.com/vi/TLflnAJx_KA/maxresdefault.jpg",
              width: 1280,
              height: 720
            }
          },
          channelTitle: "Salesforce Developers",
          playlistId: "PLgIMQe2PKPSLNXs8AGpxgGbmk8Ylp_WTP",
          position: 0,
          resourceId: {
            kind: "youtube#video",
            videoId: "TLflnAJx_KA"
          },
          videoOwnerChannelTitle: "Salesforce Developers",
          videoOwnerChannelId: "UCKORm8sxh3cheBpqs0akkhg"
        },
        contentDetails: {
          videoId: "TLflnAJx_KA",
          videoPublishedAt: "2021-02-19T19:03:09Z"
        }
      },
      {
        kind: "youtube#playlistItem",
        etag: "GybqHfunsSAeVSfxtFMzpfxW_t8",
        id: "UExnSU1RZTJQS1BTTE5YczhBR3B4Z0dibWs4WWxwX1dUUC4yODlGNEE0NkRGMEEzMEQy",
        snippet: {
          publishedAt: "2021-05-03T18:51:57Z",
          channelId: "UCKORm8sxh3cheBpqs0akkhg",
          title:
            "YouTube Live: codeLive: Building our first Node.js web application",
          description:
            "In this episode we are going to continue with our Introduction to Node.js for Salesforce Developers series, we will learn how to build our first web application using Node.js and deploy it to Heroku.",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/vqPr64AZdTQ/default.jpg",
              width: 120,
              height: 90
            },
            medium: {
              url: "https://i.ytimg.com/vi/vqPr64AZdTQ/mqdefault.jpg",
              width: 320,
              height: 180
            },
            high: {
              url: "https://i.ytimg.com/vi/vqPr64AZdTQ/hqdefault.jpg",
              width: 480,
              height: 360
            },
            standard: {
              url: "https://i.ytimg.com/vi/vqPr64AZdTQ/sddefault.jpg",
              width: 640,
              height: 480
            },
            maxres: {
              url: "https://i.ytimg.com/vi/vqPr64AZdTQ/maxresdefault.jpg",
              width: 1280,
              height: 720
            }
          },
          channelTitle: "Salesforce Developers",
          playlistId: "PLgIMQe2PKPSLNXs8AGpxgGbmk8Ylp_WTP",
          position: 1,
          resourceId: {
            kind: "youtube#video",
            videoId: "vqPr64AZdTQ"
          },
          videoOwnerChannelTitle: "Salesforce Developers",
          videoOwnerChannelId: "UCKORm8sxh3cheBpqs0akkhg"
        },
        contentDetails: {
          videoId: "vqPr64AZdTQ",
          videoPublishedAt: "2021-03-12T08:25:40Z"
        }
      }
    ],
    pageInfo: {
      totalResults: 2,
      resultsPerPage: 5
    }
  }
};
const videos = {
  data: {
    kind: "youtube#videoListResponse",
    etag: "DX7SbUCsBOe5m2wR2w8yDH5H27U",
    items: [
      {
        kind: "youtube#video",
        etag: "7BVVPM_R4ZR07EUJlHQAyLQ8PiY",
        id: "TLflnAJx_KA",
        statistics: {
          viewCount: "4287",
          likeCount: "135",
          dislikeCount: "1",
          favoriteCount: "0",
          commentCount: "31"
        }
      },
      {
        kind: "youtube#video",
        etag: "hu6uUSbuAhP-oMU-_5rH5bbQar4",
        id: "vqPr64AZdTQ",
        statistics: {
          viewCount: "2312",
          likeCount: "62",
          dislikeCount: "0",
          favoriteCount: "0",
          commentCount: "2"
        }
      }
    ],
    pageInfo: {
      totalResults: 2,
      resultsPerPage: 2
    }
  }
};

// Stub googleapis
const googleapis = {
  google: {
    youtube: () => ({
      playlistItems: {
        list: () => playlistItems
      },
      videos: {
        list: () => videos
      }
    })
  }
};

export default googleapis;
