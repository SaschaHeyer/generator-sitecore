module.exports = function() {
  var instanceRoot = "C:\\WebsiteRoot\\Habitat";
  var config = {
    websiteRoot: instanceRoot + "\\Website",
    sitecoreLibraries: instanceRoot + "\\Website\\bin",
    licensePath: instanceRoot + "\\Data\\license.xml",
    solutionName: "Helix_Evaluation.Website",
    buildConfiguration: "Debug",
    runCleanBuilds: false
  };
  return config;
}