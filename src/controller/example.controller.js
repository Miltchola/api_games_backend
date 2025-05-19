const securedExempleProcess = async (req, res) => {
  console.log("Something that needs atuhentication was run here");
  return res.status(200).json({ message: "This is a secured example process" });
};

export default { securedExempleProcess };
