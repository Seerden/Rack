# What is this?

A small weightlifting session tracking application.

# Where can I use this?

Not live yet.

# How do I run this?

WIP

# Development

## Sharing types

Since we're just using a simple REST API without codegen tools, the easiest way
to share types across client and server is to use symlinks.

-  Windows:
   ```bash
   mklink /D /h /j "./client/src/types/server/" "./server/types/"
   ```
