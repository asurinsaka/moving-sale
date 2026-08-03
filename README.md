# Moving Sale 搬家甩卖

Mobile-first, bilingual (中文/English) sale page for the SF-move gear sell-off — built to look good when the link is shared into **WeChat groups** (proper `og:` share-card tags, works in the WeChat in-app browser). Local pickup: **Hyde Park, Chicago**.

**Live:** https://asurinsaka.github.io/moving-sale/

## Editing
Everything is in **`index.html`**:
- Set your WeChat ID → the `WECHAT` constant near the top of the `<script>`.
- Add / edit / remove items → the `ITEMS` array (each has `zh`, `en`, `price`, `specs`, optional `photo`, `note`, and `cat` = `desk` / `mon` / `part`).
- **Photos:** drop `.jpg`s into `images/` and set the item's `photo:` to `images/yourfile.jpg`. Items without a photo show a placeholder.

Commit + push to `main` and GitHub Pages redeploys in ~1 minute.
