import { expect } from "chai";
import esmock from "esmock";
import createSandbox from "sinon/lib/sinon/create-sandbox.js";
import googleapis from "./stubs/googleapis.stub.js";

const execute = await esmock("../index.js", {
  googleapis
});

/**
 * Youtubestats unit tests.
 */
describe("Unit Tests", () => {
  let sandbox;
  let mockContext;
  let mockLogger;
  let mockResponse;
  let mockUnitOfWork;

  beforeEach(() => {
    mockContext = {
      org: {
        dataApi: { newUnitOfWork: () => {}, commitUnitOfWork: () => {} }
      },
      logger: { info: () => {} }
    };
    mockUnitOfWork = {
      registerCreate: () => {}
    };
    mockResponse = {
      get: () => {}
    };
    mockLogger = mockContext.logger;
    sandbox = createSandbox();

    sandbox.stub(mockContext.org.dataApi, "newUnitOfWork");
    sandbox.stub(mockContext.org.dataApi, "commitUnitOfWork");
    sandbox.stub(mockUnitOfWork, "registerCreate");
    sandbox.stub(mockResponse, "get");
    sandbox.stub(mockLogger, "info");
    mockContext.org.dataApi.newUnitOfWork.callsFake(() => {
      return mockUnitOfWork;
    });
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("Invoke YouTubeStats", async () => {
    // Mock UnitOfWork Operations
    mockUnitOfWork.registerCreate.callsFake(() => {
      return "referenceId";
    });

    mockResponse.get.onCall(0).returns({ id: "0012F00VIDFN" });
    mockResponse.get.onCall(1).returns({ id: "0012F00VIDNN" });

    // Set the mock promise response for work.commit()
    mockContext.org.dataApi.commitUnitOfWork.callsFake(() => {
      return Promise.resolve(mockResponse);
    });

    const results = await execute(
      { data: { playlistId: "PLgIMQe2PKPSLNXs8AGpxgGbmk8Ylp_WTP" } },
      mockContext,
      mockLogger
    );

    expect(mockContext.org.dataApi.commitUnitOfWork.callCount).to.be.eql(1);
    expect(results).to.not.be.undefined;
    expect(results.length).to.equal(2);
    expect(results[0].id).to.equal("0012F00VIDFN");
    expect(results[0].videoId).to.equal("TLflnAJx_KA");
    expect(results[1].id).to.equal("0012F00VIDNN");
    expect(results[1].videoId).to.equal("vqPr64AZdTQ");
  });
});
