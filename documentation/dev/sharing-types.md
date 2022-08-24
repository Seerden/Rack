## Sharing types

Since we're just using a simple REST API without codegen tools, the easiest way
to share types across client and server is to use symlinks.

-  Windows:
   ```bash
   mklink /D /h /j "./client/src/types/server/" "./server/types/"
   ```

Note that this only works outside of a Docker context. To get this working in a
docker-compose environment, we have to utilize volumes.. somehow (I'm still
trying to get this to work...)
