# vac-dsl

> A Domain-Specific Language for virtual audio routing

## Why

On Windows, an application called Virtual Audio Cable (VAC) by Eugene Muzychenko lets you create virtual audio cables. Using VAC's Audio Repeaters, you can then create connections between them and physical devices such as microphones, speakers, and headphones.

This application has many uses; among other things it becomes possible to keep audio from your microphone, voice calls and other audio from your computer (e.g. music, games) separate and record them to separate files or channels. The benefit of having recorded audio from different sources in separate channels is considerable because it makes it possible to adjust the volume and apply audio effects to each of them independently or mute them entirely. This is not only very useful to music producers and other audio professionals, but also to people who stream or record videos on platforms such as YouTube and Twitch.

One downside of Virtual Audio Cable is that it can be complicated for an average user to set up a configuration that facilitates these uses.

## What

This project (working title: _vac-dsl_) aims to compliment Virtual Audio Cable and applications like it by providing a straightforward way to write, apply, experiment with, and switch between different audio configurations.

vac-dsl lets you write your configuration using a simple, declarative text-based syntax inspired by Graphviz/DOT:

```dot
mic = "Microphone (Realtek High Definition Audio)"
headset = "Realtek Digital Output (Realtek High Definition Audio)"
speakers = "Speakers (Realtek High Definition Audio)"

# Output microphone audio to both headset and speakers
mic -> headset, speakers
```

## How

The core project consists of three components which work together to execute your configuration:

- The parser: takes the raw text and produces an Abstract Syntax Tree (AST)
- The compiler: takes the AST, resolves any variables and expands shorthands, then returns a list of connections
- The interpreter: takes the list of connections and starts an Audio Repeater instance with the right command-line arguments for each of them

If you'd like to see some example output of each stage of the process, check out [the project's test fixtures](packages/core/src/__tests__/fixtures/programs).

## Future

I have many plans for this project, including:

- Humanized error messages similar to the Elm compiler
- Syntax highlighting in IDEs and code editors
- An import system that allows users to split their configuration into multiple files, allowing better use of the DRY principle
- A language server that implements the Language Server Protocol, which enables IDE features such as autocomplete, hover information, go to variable definition, find all references, and variable renaming
- A way to compile your vac-dsl configuration to DOT/Graphviz graphs automatically for visualization
- Support for platforms and audio routing applications beyond Windows and Virtual Audio Cable

This is my first time writing a parser, compiler, or interpreter.
I'm learning a lot about language design and implementation, and it's surprisingly fun!

## License

This project is licensed under the [Apache 2.0 license](LICENSE).

_I am not affiliated with Eugene Muzychenko or the Virtual Audio Cable software.
The vac-dsl project merely provides an easy-to-use interface around VAC's publicly documented command-line API. All rights belong to their respective owners._
