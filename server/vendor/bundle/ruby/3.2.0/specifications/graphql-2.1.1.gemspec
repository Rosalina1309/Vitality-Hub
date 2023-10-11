# -*- encoding: utf-8 -*-
# stub: graphql 2.1.1 ruby lib

Gem::Specification.new do |s|
  s.name = "graphql".freeze
  s.version = "2.1.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "bug_tracker_uri" => "https://github.com/rmosolgo/graphql-ruby/issues", "changelog_uri" => "https://github.com/rmosolgo/graphql-ruby/blob/master/CHANGELOG.md", "homepage_uri" => "https://graphql-ruby.org", "mailing_list_uri" => "https://tinyletter.com/graphql-ruby", "source_code_uri" => "https://github.com/rmosolgo/graphql-ruby" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Robert Mosolgo".freeze]
  s.date = "2023-10-02"
  s.description = "A plain-Ruby implementation of GraphQL.".freeze
  s.email = ["rdmosolgo@gmail.com".freeze]
  s.homepage = "https://github.com/rmosolgo/graphql-ruby".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.4.0".freeze)
  s.rubygems_version = "3.4.10".freeze
  s.summary = "A GraphQL language and runtime for Ruby".freeze

  s.installed_by_version = "3.4.10" if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_development_dependency(%q<benchmark-ips>.freeze, [">= 0"])
  s.add_development_dependency(%q<concurrent-ruby>.freeze, ["~> 1.0"])
  s.add_development_dependency(%q<memory_profiler>.freeze, [">= 0"])
  s.add_development_dependency(%q<minitest>.freeze, ["~> 5.9.0"])
  s.add_development_dependency(%q<minitest-focus>.freeze, ["~> 1.1"])
  s.add_development_dependency(%q<minitest-reporters>.freeze, ["~> 1.0"])
  s.add_development_dependency(%q<racc>.freeze, ["~> 1.4"])
  s.add_development_dependency(%q<rake>.freeze, [">= 0"])
  s.add_development_dependency(%q<rake-compiler>.freeze, [">= 0"])
  s.add_development_dependency(%q<rubocop>.freeze, ["= 1.12"])
  s.add_development_dependency(%q<jekyll>.freeze, [">= 0"])
  s.add_development_dependency(%q<yard>.freeze, [">= 0"])
  s.add_development_dependency(%q<jekyll-algolia>.freeze, [">= 0"])
  s.add_development_dependency(%q<jekyll-redirect-from>.freeze, [">= 0"])
  s.add_development_dependency(%q<m>.freeze, ["~> 1.5.0"])
  s.add_development_dependency(%q<webrick>.freeze, [">= 0"])
end
