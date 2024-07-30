import CustomRequest from "@/service/CustomRequest";

const createLog = async (type: string, data: any) => {
  try {
    CustomRequest({
      url: "/api/front/logger/report",
      method: "POST",
      data: {
        type: type,
        data: data,
      },
      notify: false,
    });
  } catch (e) {
    console.log(e);
  }
};

export default createLog;
