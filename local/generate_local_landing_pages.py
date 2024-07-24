from jinja2 import Environment, FileSystemLoader
import csv

locale_data = []
with open('./locales.csv') as f:
    csv_reader = csv.reader(f)
    for i,row in enumerate(csv_reader):
        if len(row) != 3: print('row is not equal to 3', i, row)
        # update first row to be in the URL slug format
        row[0] = '%s-%s' % ((row[0].lower()).replace(' ', '-'), row[2].lower())
        locale_data.append({
            'slug': row[0],
            'city': row[1],
            'state_abbreviation': row[2],
        })

env = Environment(loader=FileSystemLoader('.'))
template = env.get_template('test-local.html')

for data in locale_data:
    html_output = template.render(data)

    with open('%s-digital-marketing.html' % data['slug'], 'w') as f:
        f.write(html_output)

        