import string

alph = list(string.ascii_uppercase)

#testingslfaonaskd
pan = []
count = 0
for i in alph:
    temi = ""
    temi += i
    for j in alph:
        temj = ""
        temj = temi+j
        for k in alph:
            temk = ""
            temk = temj+k
            pan.append(temk)
            count += 1

print(count)
