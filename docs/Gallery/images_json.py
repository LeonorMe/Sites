## python scrtip to create json data base

''' Exemplo desejado
[
{"id": 0, "name": "image_0", "img": "img/IMG20240907134658[1].jpg"},
{"id": \, "name": "image_1", "img": "img/IMG20240907134658.jpg"}
]
'''

import json
import os
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import cv2 as cv
import numpy as np


file = open("docs\Gallery\images_new.json", "w") # a+ para adiconar conteudo sem eliminar
file.write('[\n')

directory = 'docs\Gallery\img'
d = 'img'
id = 0
for image in os.listdir(directory):
    if(id != 0):
        file.write(",\n")
    
    path = d + "/" + image
    #path = os.path.join(directory, image)
    #img = cv.imread(path)
    #cv.imshow("Imagem", img)
    #cv.waitKey(0)
    #exit(0)
    
    #name = input("Name: ")
    name = 'image_' + str(id)

    #save
    file.write(json.dumps(
        {"id": id, 
        "name": name,
        "img": path
        # descrição
        #tipo
        })
    )
    #update id
    id += 1



file.write('\n]\n')

file.close()

exit(0)