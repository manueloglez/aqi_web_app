Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'cities/search'
      get 'cities/index'
      post 'cities/create'
    end
  end
  root 'cities#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
