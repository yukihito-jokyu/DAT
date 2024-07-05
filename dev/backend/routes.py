def setup_routes(app):
  @app.route('/', methods=['GET'])
  def index():
    return {'message': True}