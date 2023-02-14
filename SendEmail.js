const { Novu } = require("@novu/node")
const { NOVU_API_KEY }  = process.env;
const novu = new Novu(NOVU_API_KEY);

exports.SendEmail = async (obj) => {
  console.log(NOVU_API_KEY);
  const result = await novu.trigger('assignto', {
      to: {
        subscriberId: obj?.email.trim().toLowerCase(),
        email : obj?.email.trim().toLowerCase(),
      },
      payload: {
        type: obj?.type,
        name: obj?.name,
        mobile: obj?.mobile,
        message: obj?.message,
      }
    });
    return result;
};