// import { readFileSync } from "fs";
// import createUULE from "create-uule";
import mongoose from "mongoose";
// import { sendAdminMail } from "./email";

export type Geotarget = {
  _id: string;
  criteriaId: string;
  canonicalName: string;
  uule: string;
};

const Geotarget =
  mongoose.models.Geotarget ||
  mongoose.model(
    "Geotarget",
    new mongoose.Schema({
      criteriaId: String,
      canonicalName: String,
      uule: String,
    })
  );

// export const saveGeotargets = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI!);

//     const geotargetsCsvFile = readFileSync(
//       process.cwd() + "/local/geotargets.csv"
//     );

//     const geotargets = geotargetsCsvFile
//       .toString()
//       .split("\n")
//       .map((line) => {
//         const [criteriaId, ...canonicalName] = line.split(",");
//         return {
//           criteriaId,
//           canonicalName: canonicalName
//             .join(",")
//             .replace("\r", "")
//             .slice(0, -1)
//             .slice(1),
//           uule: createUULE(
//             canonicalName.join(",").replace("\r", "").slice(0, -1).slice(1)
//           ),
//         };
//       });

//     let rowCount = 0;
//     for (const geotarget of geotargets) {
//       await Geotarget.create(geotarget);
//       console.log(
//         geotarget.criteriaId,
//         geotarget.canonicalName,
//         geotarget.uule
//       );
//       rowCount++;
//       //   break;
//     }

//     console.log(`Inserted ${rowCount} rows into geotargets table`);

//     await mongoose.disconnect();

//     return true;
//   } catch (error) {
//     console.error("saveGeotargets error:", error);
//     return false;
//   }
// };

export const getGeotargets = async (
  canonicalName: string
): Promise<Geotarget[]> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const result = await Geotarget.find({
      canonicalName: { $regex: canonicalName, $options: "i" },
    }).limit(10);
    if (!result || result.length === 0) throw new Error("No geotargets found");

    await mongoose.disconnect();

    return result.map((geotarget) => ({
      _id: geotarget._id.toString(),
      criteriaId: geotarget.criteriaId,
      canonicalName: geotarget.canonicalName,
      uule: geotarget.uule,
    }));
  } catch (error) {
    console.error("getGeotargets error:", error);
    // await sendAdminMail("getGeotargets error:", JSON.stringify(error));
    return [];
  } finally {
    await mongoose.disconnect();
  }
};
