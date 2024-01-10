from http import client
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

dramas = {
        "1":{ "id": "1",
        "name": "All of Us Are Dead", 
        "genre": ["Coming-of-age", "Horror", "Zombie apocalypse"],
        "image": "https://images.squarespace-cdn.com/content/v1/56eb012f27d4bd29de975fae/1644087828456-PU4EH7DXQU82DYRQWD92/All+of+us+are+dead_header.jpg?format=1000w", 
        "synopsis": "A virus outbreak occurs at Hyosan High School. The infected quickly turn into "
                    "human eating zombies. Students at the high school must now fight for their "
                    "lives, while they look for a way out. Nam On-Jo (Park Ji-Hu) & Lee Cheong-San "
                    "(Yoon Chan-Young) have been friends since they were children. They are two of"
                    " the students trapped in a classroom and surrounded by flesh eating zombies. "
                    "Meanwhile, the Korean military work to isolate the outbreak and protect the "
                    "country from an even larger outbreak.",
        "episodes": "12",
        "rating": "7.6", 
        "stars":["Ji-hu Park", "Chan-Young Yoon","Yi-Hyun Cho"],
        "director": ["Lee Jae-kyoo", "Kim Nam-su"],
        "trailer":"https://www.youtube.com/embed/IN5TD4VRcSM"
    }, 
        "2": { "id": "2",
        "name": "Ghost Doctor", 
        "genre":["Comedy", "Fantasy", "Romance"],
        "image": 
        "https://cheesecake.articleassets.meaww.com/556065/uploads/4fd996f0-5c28-11ec-9ec3-7739e6d80b01_800_420.jpeg", 
        "synopsis": "The series revolves around two doctors from extreme backgrounds, who have "
                    "complete opposite personalities and medical skills: Cha Young Min (Rain) is"
                    " a genius doctor, with excelling surgical skills in cardiothoracic, but he "
                    "is arrogant and selfish, and Seung-tak (Kim-Bum), who although possesses excellent"
                    " medical knowledge, his fear of blood makes him fall behind other residents in terms "
                    "of medical practice. One day, Young Min gets involved in an unexpected case, and due"
                    " to this, his spirit possesses Seung Tak's body.",
        "episodes": "16",
        "rating": "8.1", 
        "stars":["Rain", "Kim BumKim", "You-Jin"],
        "director": ["Boo Seong-cheol"],
        "trailer":"https://www.youtube.com/embed/HSEICmYbo4g"
    },
        "3":{"id": "3",
        "name": "Those Who Read the Hearts of Evil (AKA Through the Darkness)", 
        "genre":["Crime", "Mystery", "Thriller"],
        "image": "https://kdramadiary.com/wp-content/uploads/2021/12/Through-the-Darkness-sbs-kdramadiary-b.jpg",        
        "synopsis": "Ha Young is a criminal behavioral analyst. He looks cold on the outside but, "
                    "he knows how to understand and see through people better than anyone else. "
                    "He decides to become a criminal profiler who always puts the victims and their"
                    " families first and takes full responsibility for them to the end. Young Soo is"
                    " the team leader of the Criminal Behavioral Analysis Team, and he acts as a "
                    "headman of the National Forensic Service, who knows what true authority is. He"
                    "realizes the importance of criminal psychology from the beginning, and therefore,"
                    "he establishes the Criminal Behavioral Analysis Team with Ha Young. As predicted, "
                    "hideous murder cases with no motive occur in a row, and finally, the need for the "
                    "Criminal Behavioral Analysis Team begins to emerge.",
        "rating": "8.4",
        "episodes": "12", 
        "stars":["Nam-gil Kim", "Jin Seon-kyu", "So-jin Kim"],
        "director": ["Park Bo-ram"],
        "trailer":"https://www.youtube.com/embed/_p6p86Ju_to"
    }
    ,
    "4":{"id": "4",
        "name": "Thirty-Nine", 
        "genre":["Drama", "Romance"],
        "image": "https://6.viki.io/image/8a6f32c2b4ec417d83b61a00d862021c/dummy.jpeg?s=900x600&e=t",
        "synopsis": "Thirty-Nine is a story about friendship and bonding between three friends who "
                    "are more like a family. They are friends since their childhood and have literally "
                    "grown up together. They have always been supporting each other in both happiness and "
                    "pain. All of them are in their late thirties and we will see how they deal with fear "
                    "and difficult situations. Son Ye-jin will be seen as the head dermatologist of a clinic "
                    "in Gangnam. Jeon Mi-do will play the character of an acting teacher. Kim Ji-Hyun will play "
                    "the role of a cosmetics manager at a department store. Amidst everything going on in their "
                    "lives, they always choose to live happily no matter the circumstances.",
        "rating": "8.0",
        "episodes": "12", 
        "stars":["Mal-Geum Kang", "Jeon Mi Do", "Kim Ji-Hyeon"],
        "director": ["Kim Sang-ho"],
        "trailer":"https://www.youtube.com/embed/ykQKCDPcqhA"
    }
    ,
    "5":{"id": "5",
        "name": "Twenty-Five Twenty-One", 
        "genre":["Drama", "Romance"],
        "image": "https://congluan.ex-cdn.com/resize/700x400/files/news/2022/02/24/twenty-five-twenty-one-ghi-diem-manh-voi-mau-phim-cuc-dep-074426.jpg",
        "synopsis": "In a time when dreams seem out of reach, a teen fencer pursues big "
                    "ambitions and meets a hardworking young man who seeks to rebuild his life. "
                    "In present day, Kim Min-chae (Choi Myung-bin), Na Hee-do's (Kim Tae-ri) daughter, "
                    "quits ballet and \"runs away\" to her grandma's house. During her stay, she comes "
                    "across her mother's diary. The story is told through Min-chae reading Hee-do's "
                    "diary, and takes place mainly in 1998.",
        "rating": "8.9",
        "episodes": "16", 
        "stars":["Nam Joo-Hyuk","Kim Ji Yeon", "Choi Hyun-Wook"],
        "director": ["Jung Ji-hyun"],
        "trailer":"https://www.youtube.com/embed/gYp4cKumTwU"
    }
    ,
    "6":{"id": "6",
        "name": "A Business Proposal (AKA The Office Blind Date)", 
        "genre":["Comedy","Drama", "Romance"],
        "image": "https://www.animationxpress.com/wp-content/uploads/2021/08/a-business-proposal-the-office-blind-date-cast-and-summary-cover-20.jpg",
        "synopsis": "In disguise as her friend, Ha-ri shows up to a blind date to scare him away. "
                    "But plans go awry when he turns out to be her CEO - and makes a proposal. "
                    "But plans go awry when he turns out to be her CEO - and makes a proposal.In "
                    "disguise as her friend, Ha-ri shows up to a blind date to scare him away.",
        "rating": "8.8",
        "episodes": "12", 
        "stars":["Ahn Hyo-Seop","Se-Jeong Kim", "Seol In-ah"],
        "director": ["Park Sun-ho"],
            "trailer":"https://www.youtube.com/embed/M-PHcxPyasA"
    },
    "7":{"id": "7",
        "name": "Military Prosecutor Doberman", 
        "genre":["Action", "Drama"],
        "image": "https://6.viki.io/image/940eea079f6c43e19b72676fc084a776/dummy.jpeg?s=900x600&e=t",
        "synopsis": "Do Bae Man became military prosecutor only to make more money and be successful."
                    " On the other hand, Cha Woo In, recently joining Bae Man's team, became one for" 
                    "her revenge. As these two different purposes shows, the two have very different "
                    "backgrounds and personalities. However, as they work on the same case, Bae Man "
                    "and Woo In help each other and even grow together as fine military prosecutors.",
        "rating": "9.8",
        "episodes": "16", 
        "stars":["Ahn Bo-Hyun","Jo Bo-ah","Kim Young-min"],
        "director": ["Jin Chang-gyu"],
        "trailer":"https://www.youtube.com/embed/lYiYhZuVz_Y"
    }
    ,
    "8":{"id": "8",
        "name": "Juvenile Justice", 
        "genre":["Crime", "Drama"],
        "image": "https://koreanbinge.files.wordpress.com/2022/03/netflix-juvenilejustice-top10.jpg",
        "synopsis": "Juvenile Justice follows the story of Shim Eun-seok, an elite judge with a cold "
                    "and distant personality, who is known for her dislike of juveniles, as she becomes "
                    "a newly appointed judge of a juvenile court in the Yeonhwa District. There, she breaks "
                    "customs and administers her own ways of punishing the offenders.",
        "rating": "8.3",
        "episodes": "10", 
        "stars":["Keisuke Hoashi","Jully Lee","Katie Anne Moy"],
        "director": ["Hong Jong-chan"],
        "trailer":"https://www.youtube.com/embed/pJpPCkFHitM"
    },
    "9":{"id": "9",
        "name": "Forecasting Love and Weather (AKA Meteorological Administration People: Office Romance Cruelty)", 
        "genre":["Drama", "Romance"],
        "image": "https://preview.redd.it/s2t7lw3owud81.jpg?auto=webp&s=aca670f98ae0a42deedec5bd50decd1ec3bd4ffb",
        "synopsis": "An office melodrama that depicts work life and love life of the people working "
                    "in Korea Meteorological Administration which is hotter than tropical nights and "
                    "more indispensable than local heavy rains.",
        "rating": "7.8",
        "episodes": "16", 
        "stars":["Park Min-Young","Song Kang","Bak Yoon"],
        "director": ["Cha Young-hoon"],
        "trailer":"https://www.youtube.com/embed/SlHMSS7RKVY"
    },
    "10":{"id": "10",
        "name": "Dr. Park's Clinic", 
        "genre":["Comedy"],
        "image": "https://i0.wp.com/koreanlovey.com/wp-content/uploads/2022/01/dr-parks-clinic-korean-drama-review-2022-7.jpg?fit=736%2C438&ssl=1",
        "synopsis": "Dr. Park Won-Jang (Lee Seo-Jin) recently opened his own internal medicine clinic. "
                    "His goal is to become acknowledged as a skilled physician and make a lot of money in "
                    "the process. He thought that if he opened his own clinic, the money would soon roll "
                    "in. Reality is a little different for Park Won-Jang. His clinic receives very few "
                    "patients and it is teetering on insolvency. He struggles to save his clinic. Making "
                    "things worse, he also suffers from hair loss. Meanwhile, Park Won-Jang is married to "
                    "Sa Mo-Rim (Ra Mi-Ran). His wife trusts the advice of medical TV programs more than her "
                    "husband.",
        "rating": "6.2",
        "episodes": "2", 
        "stars":["Seo-jin Lee","Mi-ran Ra","Cha Cheong-hwa"],
        "director": ["Seo Joon-Beom"],
        "trailer":"https://www.youtube.com/embed/7LUq-qWq8fE"
    }
}
currentid = len(dramas)

# top3 = [dramas["1"],dramas["7"],dramas["3"]]

# ROUTES
@app.route('/')
def popular():
    return render_template('popular.html', top3 = [dramas["1"],dramas["7"],dramas["3"]])   

@app.route('/view/<id>')
def save_search_results(id):    
    return render_template('view.html', show = dramas[id]) 

@app.route('/search')
def search():
    search_term = request.args.get("searchbox")
    matches = []

    words = search_term.split()

    for key in dramas.keys():
        for terms in words:
            if terms.lower() in dramas[key]["name"].lower():
                matches.append(dramas[key])
        for genre in [x.lower() for x in dramas[key]["genre"]]:
            if terms.lower() in genre:
                matches.append(dramas[key]) 
        for star in [x.lower() for x in dramas[key]["stars"]]:
            if terms.lower() in star:
                matches.append(dramas[key]) 

    matchesUnique = []
    for item in matches:
        if item not in matchesUnique:
            matchesUnique.append(item)

    if search_term.strip() != "":
        return render_template('search.html', dramas = matchesUnique, search = search_term) 
    else:
        return render_template('popular.html', top3 = [dramas["1"],dramas["7"],dramas["3"]])   

@app.route('/add')
def add():    
    return render_template('add.html',dramas=dramas)


# ajax for log_sales.js
@app.route('/addDrama', methods=['GET', 'POST'])
def addDrama():

    global currentid
    json_data = request.get_json()   

    # add new entry to array with 
    # a new id and the name the user sent in JSON
    currentid = currentid + 1
    new_entry_data = {
            "id":str(currentid),
            "name":str(json_data["name"]),
            "genre":json_data["genre"],
            "image":str(json_data["image"]),
            "synopsis":str(json_data["synopsis"]),
            "episodes":str(json_data["episodes"]),
            "rating":str(json_data["rating"]),
            "stars":json_data["stars"],
            "director":json_data["director"],
            "trailer":str(json_data["trailer"])
        }

    dramas[str(currentid)] = new_entry_data
    print(dramas[str(currentid)])

    return jsonify(newData = new_entry_data)

@app.route('/edit/<id>', methods=['GET', 'POST'])
def edit(id=None):
    global dramas
    if request.method == 'POST':
        drama = request.get_json()
        drama["id"] = id
        dramas[id] = drama
        return jsonify(drama)
    edditable = dramas[id] if id in dramas else None
    if not edditable:
        return render_template('view.html', show=edditable)

    return render_template("edit.html", drama = edditable)

if __name__ == '__main__':
   app.run(debug = True)