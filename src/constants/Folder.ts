import { z } from "zod";

const _folder = {
  getAll: {
    url: "/Folder/Get_All",
    method: "POST",
    type: z.object({
      parent_UID: z.string().optional().nullable(),
    }),
    res: z.array(
      z.object({
        Folder_UID: z.string(),
        Folder_Name: z.string(),
        Folder_Create_DT_Fa: z.string(),
      })
    ),
  },
  new: {
    url: "/Folder/New_Folder",
    method: "POST",
    data: z.object({
      parent_UID: z.string().optional().nullable(),
      folder_Name: z.string(),
    }),
    res: z.array(
      z.object({
        Folder_UID: z.string(),
        Folder_Name: z.string(),
      })
    ),
  },
  getParent: {
    url: "/Folder/Get_Parent_UID",
    method: "POST",
    data: z.object({
      folder_UID: z.string().optional().nullable(),
    }),
    res: z
      .array(
        z.object({
          Folder_UID: z.string(),
          Folder_Name: z.string(),
        })
      )
      .min(1),
  },
};

export { _folder };
