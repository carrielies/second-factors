# Government Gateway 3 Prototype

### [Prototype](https://young-river-31446.herokuapp.com)

* Developed using [GOV.UK elements](http://govuk-elements.herokuapp.com/)

# Developer setup

### Install Node version manager and node 5.11.1

```
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
    # close terminsal and reopen
    nvm install 5.11.1
```


### Start server

```
    git clone git@github.tools.tax.service.gov.uk:mark-middleton/gg3-alpha.git
    cd gg3-alpha
    npm install
    npm run dev
```

This will start an express server listening on https://localhost:3000


### Deploying to heroku

Download and install [heroku toolbelt](https://toolbelt.heroku.com/)

```
    brew install rvm
    rvm install 2.2.3
    git clone git@github.tools.tax.service.gov.uk:mark-middleton/gg3-prototype.git
    cd gg3-prototype
    gem install bundle
    bundle
    rake heroku:deploy
```

Provide heroku username and password when prompted.
