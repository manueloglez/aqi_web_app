require 'csv'

csv_text = File.read(Rails.root.join('lib', 'seeds', 'worldcities.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
csv.each do |row|
    c = City.new
    c.name = row['city_ascii']
    c.location = [row['lat'], row['lng']]
    c.save
end

puts "Total = #{City.count}"