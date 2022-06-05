from itertools import combinations


def getItemsetCountPairs(itemsets_): #takes arg like this [('i1', 'i4'),('i2','i3')]
    ##print("inside getcandidate")
    Candidate_ = {itemset_:0 for itemset_ in itemsets_}
    ##print("\tCandidate: ", Candidate_)
    for itemset_ in itemsets_:        # itemset is a tuple
        ##print("\titemset: ",itemset_)
        for transaction in dataset:
            ##print("\t\tdataset[transaction]: ", dataset[transaction])
            ##print("\t\t",itemset_,"is subset of", set(dataset[transaction]),"?")

            if str == type(itemset_):
                ##print("\t\tSingleton set")
                ##print("\t\t", set([itemset_]).issubset(set(dataset[transaction])))
                if set([itemset_]).issubset(dataset[transaction]):
                    Candidate_[itemset_] += 1
            else:
                ##print("\t\t", set(itemset_).issubset(set(dataset[transaction])))
                if set(itemset_).issubset(dataset[transaction]):
                    Candidate_[itemset_] += 1

    return Candidate_    #returning something like this {('i1','i2'):2 ,('i2','i3'):3}


def getShortlistedPairs(Candidate_):
    Candidate_2 = {}
    for itemset_ in Candidate_:
        SC = Candidate_[itemset_]
        if SC >= min_SC:
            Candidate_2[itemset_] = Candidate_[itemset_]

    return Candidate_2


def getItems(itemsets_):
    items =[]
    for itemset in itemsets_:
        if tuple == type(itemset):
            for item in itemset:
                if item not in items:
                    items.append(item)
        elif str == type(itemset):
            if itemset not in items:
                items.append(itemset)
    return  items


def genAssociations(itemsets_):
    associations = []

    if type(itemsets_[0]) == str:
        itemset_set = set(itemsets_)  # because only one itemset
        for i in range(1,len(itemset_set)):
            As_list = list(combinations(itemset_set,i))
            for A in As_list:      # if bug itemset_set -> itemsets_
                A_set = set(A)
                B_set = itemset_set - A_set
                associations.append([A_set,B_set])
        return  associations


    for itemset in itemsets_:
        itemset_set = set(itemset)
        for i in range(1, len(itemset_set)):
            As_list = list(combinations(itemset_set,i))

            for A in As_list:  # if bug itemset_set -> itemsets_
                A_set = set(A)
                B_set = itemset_set - A_set
                associations.append([A_set, B_set])
    return associations

def getSupportCount(itemset_):
    supportCount = 0
    for transaction in dataset:
        if itemset_.issubset(dataset[transaction]):
            supportCount +=1
    return supportCount

def getConfidence(A_,B_):
    if (getSupportCount(A_) == 0):
        return 0
    return getSupportCount(A_|B_)/getSupportCount(A_)




backet_items = []
fp = open('./backet_db.txt', 'r', encoding='utf-8')
while True:
    line = fp.readline()
    if not line :
        break;
    line = line.rstrip()
    backet_items.append(line.split(", "))

min_SC = 3
confidence_threshold = 7

def suggest_rule(cart_items):
    backet_items.append(cart_items)
    n_Ts = len(backet_items)
    global dataset
    dataset = {"T"+str(_+1):[] for _ in range(n_Ts)}
    for i in range(1,n_Ts+1):
        items = backet_items[i - 1]
        for item in items:
            dataset["T"+str(i)].append(item)


    itemsets = []
    for key in dataset:           # Identifying Itemsets
        for item in dataset[key]:
            if item not in itemsets:
                itemsets.append(item)

    ##print(itemsets)
    Candidate = getItemsetCountPairs(itemsets)
    ##print(Candidate)
    Candidate = getShortlistedPairs(Candidate)
    ##print("--------------------------------------")
    ##print("After shortlisting")
    ##print(Candidate)
    #Candidate = getCandidate([('i1', 'i2'), ('i2','i3')])
    #print(Candidate)
    Candidate_old = Candidate
    no_of_items_in_itemset = 1
    while max(Candidate.values())>=min_SC :
        ##print("___________________________________________________________")
        Candidate_old = Candidate
        ##print("before shortlisting: ", Candidate)
        Candidate = getShortlistedPairs(Candidate)
        ##print("After shortlisting", Candidate)

        no_of_items_in_itemset += 1
        ##print(Candidate.keys())
        items = getItems(Candidate.keys())
        ##print("items=", items)
        if len(items) < no_of_items_in_itemset:
            Candidate_old = Candidate
            break
        itemsets = list(combinations(items,no_of_items_in_itemset))
        ##print("itemsets:",itemsets)

        Candidate = getItemsetCountPairs(itemsets)



    ##print("Final", Candidate_old)

    frequent_sets = list(Candidate_old.keys())

    associations = genAssociations(frequent_sets)

    #print(associations)
    #print(len(associations))

    confidences = []
    confidence_percentages = []

    for association in associations:
        A,B = association
        confidences.append(getConfidence(A,B))

    #print("confidences",confidences)

    true_rules_indexes =[]

    for i in range(len(confidences)):
        if confidences[i]*100 > confidence_threshold:
            true_rules_indexes.append(i+1)    #icrementing by 1 for display

    #print(true_rules_indexes)

    ############ Displaying final output #############
    print("\nFrequent itemset(s) are: ")
    for itemset_ in Candidate_old:
        print("itemset: {"+str(itemset_).strip("()")+"} support count:", Candidate_old[itemset_])

    rules = []
    for i,association,confidence in zip(range(1,len(associations)+1),associations,confidences):
        A_,B_ = association
        rules.append([A_, B_])
        sc = getSupportCount(A|B)
        print("{: ^10}{: ^15}{: ^15}{: ^15}{: ^15}".format(i,str(A_).strip("{}")+"->"+str(B_).strip("{}"), sc, confidence,confidence*100))
    res = []
    for i in true_rules_indexes:
        print(i)
        res.append(rules[i-1])
    return res

suggest_rule(["Dép_Lê", "Áo_Vét"])
