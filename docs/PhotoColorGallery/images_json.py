## python scrtip to create json data base

''' Exemplo desejado
[
{"image": "IMG20240907134658[1].jpg", "titulo": "image0", "cores": "(255,217,185)"},
{"image": "IMG20240907134658[1].jpg", "titulo": "image0", "cores": "(255,217,185)"}
]
'''

import json
import os
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import cv2 as cv
import numpy as np

def equalize(img):
    img = cv.cvtColor(img, cv.COLOR_BGR2HLS)
    (H, L, S) = cv.split(img)
    He = cv.equalizeHist(H)
    Le = cv.equalizeHist(L)
    Se = cv.equalizeHist(S)
    merged = cv.merge([He, Le, Se])
    img = cv.cvtColor(merged, cv.COLOR_HLS2BGR)
    cv.imshow("Merged", img)
    cv.waitKey(0)
    return img

def calcCores(img, n=6):
    # 1. Cluster pixels using kmeans
    # 2. Sort the clusters from largest to smallest
    # 3. Use the cluster center as a color
    n_clusters = 5
    data = cv.resize(img, (100, 100)).reshape(-1, 3)
    criteria = (cv.TERM_CRITERIA_EPS + cv.TERM_CRITERIA_MAX_ITER, 10, 1.0)
    flags = cv.KMEANS_RANDOM_CENTERS
    compactness, labels, centers = cv.kmeans(data.astype(np.float32), n_clusters, None, criteria, 10, flags)

    cluster_sizes = np.bincount(labels.flatten())

    palette = []
    for cluster_idx in np.argsort(-cluster_sizes):
        palette.append(np.full((img.shape[0], img.shape[1], 3), 
                                fill_value=centers[cluster_idx].astype(int), 
                                dtype=np.uint8))
    palette = np.hstack(palette)

    sf = img.shape[1] / palette.shape[1]
    out = np.vstack([img, cv.resize(palette, (0, 0), fx=sf, fy=sf)])

    #print(out)
    #cv.imshow("dominant_colors", out)
    #cv.waitKey(0)
    # TODO use LAB color space
    
    return out
    

file = open("photografy/images.json", "w") # a+ para adiconar conteudo sem eliminar
file.write('[\n')

directory = 'photografy/images'
i = 0
for image in os.listdir(directory):
    if image != 'IMG20240907134658[1].jpg':
        file.write(",\n")
    
    img = cv.imread(os.path.join(directory, image))
    #cv.imshow("Imagem", img)
    #cv.waitKey(0)
    
    #titulo = input("Titulo: ")
    titulo = 'image' + str(i)
    i += 1
    #equalize(img)
    
    cores = calcCores(img) # returns numpy.ndarray
    #print(cores.shape) # (1438, 1592, 3)

    # TODO fazer lista de cores
    cor = '(' + str(cores[0][0][0]) + "," + str(cores[0][0][1]) + "," + str(cores[0][0][2]) + ")"

    #save
    file.write(json.dumps(
        {"image": image, 
        "titulo": titulo,
        "cores": cor
        # descrição
        })
    )

file.write('\n]\n')

file.close()

exit(0)