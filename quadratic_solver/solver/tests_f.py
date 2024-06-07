from random import random, randint
import math

def find_roots(a, b, c):
    discriminant = b**2 - 4*a*c
    if discriminant > 0:
        root1 = (-b + math.sqrt(discriminant)) / (2*a)
        root2 = (-b - math.sqrt(discriminant)) / (2*a)
        return root1, root2
    elif discriminant == 0:
        root = -b / (2*a)
        return root,
    else:
        return None

def get_abc(acc):
    a = 0
    b = 0
    c = 0
    while True:
        a = random() * randint(1, 5)
        b = random() * randint(1, 5) * 4
        c = random() * randint(1, 5)
        discriminant = b**2 - 4*a*c
        if discriminant >= 0:
            break
    sa = str(round(a, acc))
    sb = str(round(b, acc))
    sc = str(round(c, acc))
    return sa, sb, sc