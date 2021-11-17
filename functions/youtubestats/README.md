# YouTubeStats Function

This function receives a playlist id, retrieves its videos, and store each video statistics in Salesforce

## Local Development

1. Install dependencies with

```
npm install
```

2. Run tests with

```
npm test
```

3. Start your function locally

```
sf run function start -e YOUTUBE_API_KEY=<YOUR_API_KEY>
```

4. Invoke your function locally

```
sf run function --function-url=http://localhost:8080 --payload='{"playlistId": "PLgIMQe2PKPSLNXs8AGpxgGbmk8Ylp_WTP"}'
```
