import { HashFileID, HashRegistryValue } from "./crypto";
import { FileType, NewFileID } from "./skydb";

const appID = "SkySkapp";
const filename = "foo.txt";
const fileID = NewFileID(appID, FileType.PublicUnencrypted, filename);

describe("HashFileID", () => {
  it("should match siad for equal input", () => {
    // "t" is the tweak generated by siad with the same input parameters
    const t = "840aacebcc7f1b0ae65482f77566270417544ee60245255fbec028ea2cbfe975";
    const tweak = HashFileID(fileID);
    expect(Buffer.from(tweak).toString("hex")).toEqual(t);
  });
});

describe("HashRegistryValue", () => {
  it("should match siad for equal input", () => {
    // "h" is the hash generated by siad with the same input parameters
    const h = "dfa50c6ffdf6568cf66440344d498ce89e2e07e6422df1d4f733b1fbed682287";
    const hash = HashRegistryValue({
      tweak: HashFileID(fileID),
      data: "abc",
      revision: 2,
    });
    expect(Buffer.from(hash).toString("hex")).toEqual(h);
  });
});
