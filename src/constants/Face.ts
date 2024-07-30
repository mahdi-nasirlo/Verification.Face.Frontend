import { z } from "zod";

const _face = {
  getStatus: {
    url: "/Face/Get_Status",
    method: "POST",
    type: z.object({
      face_UID: z.string(),
    }),
    res: z.array(z.object({ Check_Status: z.number() })),
  },
  info: {
    url: "/Face/face_info/",
    method: "GET",
    type: z.object({
      uid: z.string(),
    }),
    res: z.array(
      z.object({
        Face_UID: z.string(),
        Face_Create_DT_Fa: z.string(),
        Gender: z.number(),
        Name: z.string(),
        Family: z.string(),
        Code_GUID: z.string(),
        Code_ID: z.number(),
        Code_Keyword: z.string(),
        Code_Melli: z.string(),
        GPS_Lat: z.number(),
        GPS_Long: z.number(),
        Image_Storage_Status: z.number(),
        Check_Status: z.number(),
        Face_Image_Size: z.number(),
        Check_DT: z.string(),
        Bio_Gender: z.boolean(),
        Bio_Gender_Confidence: z.number(),
        Bio_Age_Confidence: z.number(),
        Bio_Liveness_Confidence: z.number(),
      })
    ),
  },
  getAll: {
    url: "/Face/Get_All",
    method: "POST",
    type: z.object({
      parent_UID: z.string().nullable(),
      need_Detail: z.boolean().optional(),
    }),
    Recognition_Result: z.array(z.object({})),
    res: z.array(
      z.object({
        Family: z.string(),
        Name: z.string(),
        Face_UID: z.string(),
        Face_Create_DT_Fa: z.string(),
        Check_Status: z.number(),
        Bio_Gender: z.number(),
        Bio_Age_Confidence: z.number(),
        Bio_Liveness_Confidence: z.number(),
        Bio_Gender_Confidence: z.number(),
        Recognition_Result: z.string(),
      })
    ),
  },
  delete: {
    url: "/Face/Delete",
    type: z.object({
      parent_UID: z.string().optional().nullable(),
      face_UID: z.string(),
    }),
    method: "POST",
    res: z.object({}),
  },
  blob: {
    url: "/Download/face/",
  },
  newFace: {
    url: "/Face/New_Face",
    method: "POST",
    type: z.object({
      parent_UID: z.string(),
      face_Image_Data_Base64: z.string(),
      image_Storage_Status: z.number(),
      name: z.string(),
      family: z.string(),
      code_GUID: z.string(),
      code_ID: z.number(),
      code_Keyword: z.string(),
      code_Melli: z.string(),
      gpS_Lat: z.number(),
      gpS_Long: z.number(),
    }),
    res: z.object({}),
  },
};

export { _face };
