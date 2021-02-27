
use Rack::Static,
:urls => ["/img", "/js"],
:root => "public"

class LocationTest
  def call(env)
    req = Rack::Request.new(env)

    case req.path_info
    when "/"
      [200, {"Content-Type" => "text/html", 'Cache-Control' => 'public, max-age=86400'}, File.open('public/index.html', File::RDONLY)]
    else
      [404, {"Content-Type" => "text/html", 'Cache-Control' => 'public, max-age=86400'}, File.open('public/404.html', File::RDONLY)]
    end
  end
end

run LocationTest.new
