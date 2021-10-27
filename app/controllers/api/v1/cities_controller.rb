class Api::V1::CitiesController < ApplicationController
    skip_before_action :verify_authenticity_token

    def create
        city = City.new city_params
        if city.save
            render json: {id: city.id}
        else
            render(
            json: {errors: city.errors.messages},
            status: 422
            )
        end
    end

    def index
        cities = City.all
        render json: cities
    end

    def search
        cities = City.ransack(name_cont: params[:q]).result(distinct: true).limit(5)
        render json: cities
    end

    private

    def city_params
        params.require(:city).permit(:name, :location)
    end
end
