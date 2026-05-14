import Colors from '@/constants/Colors';
import { useSQLiteContext } from 'expo-sqlite';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function Admin() {
    const db = useSQLiteContext();
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light'];
    const styles = StyleSheet.create({
        wrapper: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        },

        header: {
            flex: 1,
            fontSize: 24,
            color: colors.text,
            textAlign: 'center',
        },

        listProductCardWrapper: {
            flex: 10,
            display: 'flex',
            flexDirection: 'column',
            borderColor: 'white',
            borderStyle: 'solid',
            borderWidth: 1,

        },
        listProductCard: {
            display: 'flex',
            flexDirection: 'row',
            borderColor: 'red',
            borderStyle: 'solid',
            borderWidth: 1,
            margin: 3,

        },
        listProductCardData: {
            textAlign: 'center',
            flex: 1,
            color: colors.text,
            fontSize: 18,
        },


    });
    const InitInsert = async () => {
        const stmt = await db.prepareAsync('INSERT INTO produits (nom, description, prix, image) VALUES ($nom, $description, $prix, $image)');
        const produits = ([
            { id: 0, nom: "Boule de crystal maudite", description: "Une boule de crystal maudite par le grand sorcier akthakal, celui qui réfléchit l'orbe y voit sa propre mort", prix: 66.66, image: "ball1" },
            { id: 1, nom: "Boule de crystal", description: "Boule de crystal traditionelle", prix: 79.99, image: "ball2" },
            { id: 2, nom: "Boule de crystal royale", description: "Une boule de crystal provenant des coffrages d'un royaume", prix: 149.99, image: "ball3" },
            { id: 3, nom: "Boule de crystal électronique", description: "Une boule de crystal provenant de loin. Contient une engravure 'made in china'", prix: 2.37, image: "ball4" },
            
            { id: 3, nom: "Oeuf d'Ironbelly ukrainien", description: "Oeuf de dragon collecté sans cruauté", prix: 100.00, image: "egg1" },
            { id: 4, nom: "Oeuf de Norvégien à crête", description: "Oeuf de dragon collecté sans cruauté", prix: 120.00, image: "egg2" },
            { id: 5, nom: "Oeuf de Boutefeu chinois", description: "Oeuf de dragon collecté sans cruauté", prix: 110.00, image: "egg3" },
            { id: 6, nom: "Oeuf mysterieux", description: "Un Oeuf mysterieux, unique en son genre ", prix: 1071.00, image: "egg4" },

            { id: 7, nom: "Elfe de maison", description: "Race standardisé par Eugeninc™ ", prix: 59.99, image: "elf1" },
            { id: 8, nom: "Elfe de maison", description: "Parfait pour le sorcier occupé d'aujoud'hui", prix: 79.99, image: "elf2" },
            { id: 9, nom: "Elfe de maison", description: "Un elfe de maison loyal vaut son poid en or: pour vous, c'est seulement 199.99$ (prix d'ami)", prix: 199.99, image: "elf3" },
            { id: 10, nom: "Elfe de maison miniature", description: "Ok, c'est peut être plus un troll de maison qu'un elfe, mais il fait le travail pareil. Très rusé(et grincheux).", prix: 55.99, image: "elf4" },

            { id: 11, nom: "Chapeau de Sorcier en cuire", description: "Composée de cuire de wyverne et de tissu de Lala-barina", prix: 35.00, image: "hat1" },
            { id: 12, nom: "Chapeau de Sorcier bleu et or", description: "Pigmentée à l'aide de poudre de Lunestra, ce chapeau est inflammable. Article déconceillé pour les pyromanciens", prix: 32.49, image: "hat2" },
            { id: 13, nom: "Chapeau de nuit", description: "Couvre-chef très léger. Parfait pour porter dans votre tour", prix: 6.99, image: "hat3" },
            { id: 14, nom: "Chapeau de Sorcier montrealais", description: "Récolter sur le bord de la rue, très bonne condition", prix: 562.46, image: "hat4" },

            { id: 15, nom: "Wolfsbane", description: "Un ingrédiant reconnue mondialement et très populaire dans une variété de potions", prix: 3.00, image: "herb1" },
            { id: 16, nom: "Floraison Écarlate", description: "Fleur rare de la vallée de l'haligtree", prix: 7.39, image: "herb2" },
            { id: 17, nom: "Brancherbe", description: "Plante incroyable utilisée dans des concoctions afin que de pouvoir respirer dans l'eau", prix: 6.99, image: "herb3" },
            { id: 18, nom: "Herbe mystiques", description: "Herbe psychoactive extrêmement populaire chez les sorciers", prix: 4.20, image: "herb4" },
            { id: 18, nom: "Menthe somnifere", description: "réactif utilisé dans les potions de sommeil", prix: 2.22, image: "herb5" },

            { id: 19, nom: "Pipe en bois", description: "Pipe en bois de qualité, utilisée partout dans le monde", prix: 15.99, image: "pipe1" },
            { id: 20, nom: "Pipe en bois vert", description: "Pipe en bois d'azurithe, pour le sorcier distingué et noble", prix: 23.99, image: "pipe2" },
            { id: 21, nom: "Pipe moderne", description: "Pipe en plastique avec un embout métalique résistant à la chaleur. Offre une longue durée de vie", prix: 12.99, image: "pipe3" },
            { id: 22, nom: "Pipe intimidante", description: "Une pipe qui laissera vos enemies tremblé dans leurs bottes, celle-ci assure votre confidance et votre pouvoir", prix: 32.99, image: "pipe4" },
            { id: 23, nom: "Pipe recyclée", description: "Une pipe écologique, fabriqué à partir d'éléments 101% recyclés. Parfait pour les sorciers sans tour définie", prix: 5.99, image: "pipe5" },

            { id: 24, nom: "Poudre de perlimpinpin", description: "Provoque de la couleur lors de sa flagration. Parfait pour impressioner les individus ordinaires", prix: 2.99, image: "poudre1" },
            { id: 25, nom: "Poudre de Lunastra", description: "Poudre extrêmement destructive. Provoque de graves explosions lorsqu'elle est touchée par une étincelle", prix: 15.99, image: "poudre2" },
            { id: 26, nom: "Poudre noire", description: "Poudre à cannon utilisée dans les armes a feu. Beaucoup moins puissante que la poudre de Lunastra", prix: 7.99, image: "poudre3" },

            { id: 27, nom: "Robe d'invocation", description: "Robe d'invocateur commune", prix: 49.99, image: "robe1" },
            { id: 28, nom: "Robe d'abjuration", description: "Robe du protecteur royale, évite la force des coups par le tissu enchanté qui la compose", prix: 79.99, image: "robe2" },
            { id: 29, nom: "Robe de la grande sirène", description: "Robe au style de la grande sirène, sorcière reconnue pour ses talents d'enchantresse", prix: 99.99, image: "robe3" },
            { id: 30, nom: "Robe de transmutation", description: "Parfait pour changer les rats en goblets(savoir faire requis)", prix: 69.99, image: "robe4" },
            { id: 31, nom: "Robe légendaire", description: "Vêtements idéales pour les archimage. Porté par un héro mythique.", prix: 6932.48, image: "robe5" },
            { id: 32, nom: "Robe de divination", description: "Robe de divination commune", prix: 49.99, image: "robe6" },

            { id: 33, nom: "Champignons mystiques", description: "Champignon psychoactif important chez les divinateurs", prix: 47.99, image: "shroom1" },
            { id: 34, nom: "Champignon de Schtroumpfs", description: "Déteré du sol dans la forêt des Schtroumpfs.(habitant non inclu)", prix: 101.99, image: "shroom2" },
            { id: 35, nom: "Champignon bleu", description: "Champignon provenant de la forêt de Zia. Facilite le rétablissement des blessures lorsqu'il est préparé correctement, sinon, il est toxique", prix: 29.99, image: "shroom3" },
            { id: 36, nom: "Champignon +1", description: "Champignon avec des propriétés soignante fantastiques", prix: 100.00, image: "shroom4" },

            { id: 37, nom: "Venin de Shelob", description: "Venin extrêmement rare, produit par Shelob, la créature légendaire", prix: 3000.99, image: "venom1" },
            { id: 38, nom: "Venin de basilic", description: "Venin très rare, produit par les basilics. Seul les larmes de phoenix peuvent contrer l'effet mortelle de celui-ci", prix: 300.99, image: "venom2" },
            { id: 39, nom: "Venin de Rathian", description: "Venin commun récolté à partir de la queue d'un rathian. Une dose de celui-ci peut être mortelle pour un humain ordinaire.", prix: 32.99, image: "venom3" },
            { id: 40, nom: "Venin radioactif", description: "Petite bouteille de venin synthétique extrêmement radioactif. Provoque de grand changements chez certaines espèces.", prix: 265.99, image: "venom4" },

            { id: 41, nom: "Baguette magique", description: "Fait de bois de sureau, 11 pouces avec un coeur de cheveux de queue de licorne et inflexible", prix: 66.99, image: "wand1" },
            { id: 42, nom: "Baguette magique", description: "Fait de prunellier noir, 12 pouces avec un coeur de plume de phoenix et pas très flexible", prix: 48.99, image: "wand2" },
            { id: 43, nom: "Baguette magique", description: "Fait de bois de tremble, 9 pouces et demi avec un coeur de dragon et légèrement élastique", prix: 42.99, image: "wand3" },
        ]);
        let result;
        for (let i = 0; i < produits.length; i++) {
            result = await stmt.executeAsync({ $nom: produits[i].nom, $description: produits[i].description, $prix: produits[i].prix, $image: produits[i].image });
            console.log("result : ", result.lastInsertRowId, result.changes);
        }

    }
    const order66 = async () => {
        const stmt = await db.prepareAsync('DELETE FROM produits WHERE 1=1');

        let result = await stmt.executeAsync();
        console.log("result : ", result.lastInsertRowId, result.changes);
    }
    return (
        <View>
            <TouchableOpacity
                onPress={InitInsert}>
                <Text style={{ color: colors.text }}>Hydrate DB</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={order66}>
                <Text style={{ color: colors.text }}>Hydrogen bomb</Text>
            </TouchableOpacity>
        </View>
    )
}