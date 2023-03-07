# electron-snap

An electron wrapper around snap, designed to make snap easier to use offline in my Game Development class.

## Motivation

My students (ages ranging from 3rd grade to 8th grade) consistently find the offline student experience for snap confusing. Snap is an awesome tool for teaching the basics of computer science, but I don't want to require my students to create an account with an online service in order to use it. I have been making the current solution work, but downloaded html, css, and javascript opened directly in the browser has proven to be insufficient in the following ways:

1. Students often try to open their projects by directly opening the project XML files
2. Students get distracted by the web browser during class even without internet connection (they always manage to find the hidden offline game)
3. Students forget how to open snap and thus don't use it outside of class
4. "Downloading" exported files is confusing for students for a few reasons
	1. Microsoft edge shows a warning whenever saving xml files that students often forget to accept, resulting in projects being unsaved and data being lost
	2. Students (younger students especially) get confused by the file explorer UI
	3. Students don't know where they're saved files end up and thus don't take they're projects home
5. Different home operating systems and browsers create an inconsistent experience outside of class, making it difficult to send home written instructions for how to use snap outside of class
6. Finding the right costume/background is difficult on Windows since SVG's don't show previews by default (this can be fixed by installing PowerTools)

## Modifications

In order to aliviate the above pits of failure, this project attempts to makes the following changes

- Package Snap as a standalone desktop app which can be easily installed on home computers and used without a browser environment
- Add concept of "workspaces". Snap always runs in the context of a workspace. A workspace is a directory that contains snap export files. Exporting files always saves them to a well known path in the workspace folder, prompting for a name if necessary. File prompts show a custom, less overwhelming (and more platform consistent), file picker UI scoped to the workspace with an option to open the native file picker UI if desired. See below for further explanation.
- Save artifact files with a `.snap` extension which can be opened directly in snap by default

Most of these changes are WIP

## Packaging and distribution

TODO: Figure out how to package and distribute electron app so students can use it easily at home

Goal: Send students home with a USB drive that contains a Snap executable (or an installer for Snap) and a workspace folder

## Workspaces

Workspaces give snap a default place to save exported files (projects, blocks, etc) so that students do not need to be presented with a file picker dialog. It also gives a default place for students to select files when prompted (e.g. opening a project within snap). Students can open workspaces by directly opening a root `Workspace.snap` file. If Snap is not opened by opening a `Workspace.snap` file, Snap uses the default workspace, which can be configured by the student. The default is `app.getPath()/Workspace`. Opening a `Workspace.snap` file prompts the student to set the default workspace if it has not already been set and the student hasn't seen the prompt before.

The expectation is that students should really only have one workspace

Example workspace structure

```
<root>/Workspace.snap		# Snap workspace file, opens snap and prompts student to set default workspace
<root>/projects/ 		# Project files
<root>/scripts/			# Exported scripts
<root>/blocks/			# Exported blocks
<root>/costumes/		# Costumes and backgrounds
<root>/screenShots/		# Script pics and screen grabs
```
