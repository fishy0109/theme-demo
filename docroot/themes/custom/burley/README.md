# A Drupal 8 sub-theme based on Barrio (Bootstrap 4)

## Dependency
Drupal 8 theme "Barrio" - https://www.drupal.org/project/bootstrap_barrio


## Getting started
Run `npm install`. If it stalls, delete the `node_modules` directory and start over

## Tasks

### For production deployment...

From the theme directory, run `npm run-script build`

All compiled assets are located at `assets/dist`, which are ignored by git

### For development...
1. Add the following line to your local settings file `putenv('DRUPAL_THEME_MODE=dev');`
2. From the theme directory, run `npm run-script watch`

All compiled assets are located at `assets/dev`, which are part of git
