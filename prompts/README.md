# Prompt Compression

Command pendek adalah kontrak intent dan routing, bukan CLI dan bukan prompt besar tersembunyi. AI membaca definisi pada `commands.yaml`, memuat modul yang relevan, lalu mengikuti project context dan risk model.

Command tidak memperluas authorization. Misalnya `premium-ui` tidak mengizinkan perubahan API, dan `commit-msg` tidak mengizinkan Git commit.

