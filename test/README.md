# GG3alpha acceptance Tests

Acceptance tests for the gg3alphaAdded  project

## Technologies:

* Ruby
* [Capybara](https://github.com/jnicklas/capybara)
* [Cucumber](https://cucumber.io)


## Inital Setup

1) Install [RVM](https://rvm.io/rvm/install):
```
gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
curl -sSL https://get.rvm.io | bash
rvm install 2.3.0
```
Close terminal and reopen to load RVM into your environment.  RVM is a ruby version manager.

2) Install chromedriver

Download the latest chromedriver from [here](https://sites.google.com/a/chromium.org/chromedriver/downloads).
Extract and copy to /usr/local/bin


3) Download and build project

```
cd $WORKSPACE
git clone git@github.tools.tax.service.gov.uk:HMRC/gg3-authentication-acceptance-tests.git
cd gg3-authentication-acceptance-tests
gem install bundle
bundle
```


## Runing the cucumber tests

```
cucumber
```

# Links

* [Capybara cheat sheet](https://gist.github.com/zhengjia/428105)