task :build do
  system "npm run postinstall"
end

namespace "cf" do

  desc "stage cloud foundary app"
  task :stage => :build do
    root = "./cf_stage"

    system(<<-SCRIPT)
      rm -rf #{root}
      mkdir #{root}
      cp -r ./dist #{root}
      cp -r ./public #{root}
      cp -r ./govuk_template #{root}
      cp -r ./docs #{root}
      cp -r ./conf #{root}
      cp -r ./key.pem #{root}
      cp -r ./cert.pem #{root}
      cp ./config.js #{root}
      cp index.html #{root}
      cp cf_package.json #{root}/package.json
      cp cf_manifest.yml #{root}/manifest.yml
      cp server.js #{root}
      cp server-prod.js #{root}
      cd #{root}
    SCRIPT

    puts "To deploy to cloud foundary: \n
          cd cf_sage
          cf push"
  end

end