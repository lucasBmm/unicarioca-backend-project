from flask import Flask
from .routes.Company import company_bp
from .routes.Volunteer import volunteer_bp
from .routes.Vacancy import vacancy_bp

app = Flask(__name__)

app.register_blueprint(vacancy_bp)
app.register_blueprint(company_bp)
app.register_blueprint(volunteer_bp)

if __name__ == '__main__':
    app.run(debug=True)