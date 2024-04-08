import math

def calculatexp(level):
    return math.floor(1.1**(level**2))

if __name__ == "__main__":
    for i in range(1, 11):
        print(f"LEVEL_{i} xp: {calculatexp(i)} xpdiference: {calculatexp(i) - calculatexp(i-1)}")
