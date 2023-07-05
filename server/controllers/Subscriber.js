export const getSubscriberPage = async function (req, res) {
  try {
    console.log(`Server up and running...`);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: 400, message: "Error getting subscriber page" });
  }
};