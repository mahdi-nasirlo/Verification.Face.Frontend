import { z } from "zod";
const _recognition = {
  download: {
    url: "/Download/recognition/",
  },
  search: {
    url: "/Recognition/New_Search",
    method: "POST",
    type: z.object({
      image_Base64: z.string(),
    }),
    res: z.array(
      z.object({
        Recognition_UID: z.string(),
        Recognition_Type: z.number(),
        Owner_ID: z.number(),
        Image_Base64: z.string(),
        Image_Size: z.number(),
        Image_Base64_2: z.string().nullable(),
        Image_Size_2: z.number().nullable(),
        Compare_Face_UID: z.string().nullable(),
        Status: z.number(),
        Image_Storage_Status: z.number(),
        Search_Result: z.string().nullable(),
        Recognition_Result_Similarity: z.number(),
        Create_DT: z.string(),
        Recognition_DT: z.string(),
        Is_Deleted: z.boolean(),
        Deleted_DT: z.string().nullable(),
        Recognition_Result: z.string(),
      })
    ),
  },
  Recognition_Result: z.object({
    count: z.number(),
    result: z.array(
      z.object({
        recognition_uid: z.string(),
        results: z.array(
          z.object({
            face_uid: z.string(),
            similarity: z.number(),
          })
        ),
      })
    ),
  }),
  getAll: {
    url: "/Recognition/Get_All",
    method: "POST",
    type: z.object({
      need_Detail: z.boolean(),
    }),
    res: z.array(
      z.object({
        Recognition_UID: z.string(),
        Recognition_Type: z.number(),
        Owner_ID: z.number(),
        Image_Base64: z.string(),
        Image_Size: z.number(),
        Image_Base64_2: z.string().nullable(),
        Image_Size_2: z.number().nullable(),
        Compare_Face_UID: z.string().nullable(),
        Status: z.number(),
        Recognition_Result_Face_UID: z.string(),
        Image_Storage_Status: z.number(),
        Search_Result: z.string().nullable(),
        Create_DT: z.string(),
        Recognition_DT: z.string(),
        Is_Deleted: z.boolean(),
        Deleted_DT: z.string().nullable(),
        Recognition_Result: z.string(),
      })
    ),
  },
};

export { _recognition };
