export class RemoteGem {
  public gemName: string;

  constructor(gemName: string) {
    this.gemName = gemName;
  }

  // Get the registerd gem version from rubygems.org.
  // https://guides.rubygems.org/rubygems-org-api/#gem-version-methods
  public async getVer(): Promise<string> {
    const https = require("https");

    return new Promise((resolve, reject) => {
      https.get(`https://api.rubygems.org/api/v1/versions/${this.gemName}/latest.json`, (res) => {
        res.on("data", (data) => {
          const ver = JSON.parse(data.toString()).version;

          resolve(ver);
        });
      });
    });
  }
}
