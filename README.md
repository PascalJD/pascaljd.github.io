# pascaljd.github.io (Quarto + GitHub Pages)

This is a Quarto website configured to publish via GitHub Pages **from the `/docs` folder**.

## Local preview
1) Install Quarto: https://quarto.org/
2) From this folder:

```bash
quarto preview
```

## Publish (docs/ workflow)
```bash
quarto render
git add -A
git commit -m "Render site"
git push
```

Then in GitHub repo settings:
Settings → Pages → **Deploy from a branch** → Branch: `main` → Folder: `/docs`