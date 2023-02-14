const { Novu } = require("@novu/node")
const novu = new Novu("e922483eb737c46e3d8a1fb294aefc03");

exports.SendEmail = async (obj) => {
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