
#addin "nuget:?package=Cake.WinSCP&version=0.3.0"
#addin "nuget:?package=Cake.Npm&version=0.17.0"
#l "nuget:?package=Cake.igloo15.Scripts.Standard&version=2.1.0"
#l "nuget:?package=Cake.igloo15.Scripts.Changelog&version=2.1.0"

var ftpPassword = ArgumentOrEnvironmentVariable<string>("FTPPASSWORD", "password", true);

var target = Argument<string>("target", "Default");


Task("Build")
    .IsDependentOn("Standard-All")
    .Does(() => {
      NpmInstall();
      NpmRunScript("deploy");
    });


Task("Default")
    .IsDependentOn("Build");

Task("Deploy")
	.IsDependentOn("Build")
  .Does(() => {
    WinScpSync($"ftp://igloo15:{ftpPassword}@igloo15.com/", "/dungeon.igloo15.com", "./dist/dungeon-game", false);
  });

RunTarget(target);
