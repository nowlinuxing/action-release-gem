# action-release-gem

Release your gem automatically.

* Create a tag on your github repository in GitHub
* Build a gem and push to rubygems.org

## Usage

```yaml
# .github/workflows/release_gem.yml
on:
  push:
    branches:
      - master

jobs:
  build:
    name: Build + Publish
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@master

      # Require ruby to execute gem command
      - name: Set up Ruby 2.6
        uses: actions/setup-ruby@v1
        with:
          version: 2.6.x

      - name: Create a tag and release to rubygems.org
        uses: nowlinuxing/action-release-gem@v1
        env:
          GEM_HOST_API_KEY: ${{secrets.RUBYGEMS_AUTH_TOKEN}}
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

```sh
$ git add lib/yourgem/version.rb
$ git commit -m 'Bump version'
$ git push origin master
```

## Code in Master

Install the dependencies  
```bash
$ npm install
```

Build the typescript
```bash
$ npm run build
```

Run the tests :heavy_check_mark:  
```bash
$ npm test
```

## Publish to a distribution branch

Actions are run from GitHub repos.  We will create a releases branch and only checkin production modules (core in this case). 

Comment out node_modules in .gitignore and create a releases/v1 branch
```bash
# comment out in distribution branches
# node_modules/
```

```bash
$ git checkout -b releases/v1
$ git commit -a -m "prod dependencies"
```

```bash
$ npm prune --production
$ git add node_modules
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing the releases/v1 branch

```yaml
uses: actions/action-release-gem@releases/v1
```

See the [actions tab](https://github.com/actions/javascript-action/actions) for runs of this action! :rocket:

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and tested action

```yaml
uses: actions/action-release-gem@v1
```
