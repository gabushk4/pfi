import Colors from '@/constants/Colors';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';

export default function Admin() {
    const db = useSQLiteContext();
    const colorScheme = useColorScheme()
    const colors = Colors[colorScheme ?? 'light'];
    const [nom, setNom] = useState('');
    const [prix, setPrix] = useState(0.00);
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');
    const styles = StyleSheet.create({
        wrapper: {
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        inputWrapper: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
        },
        input: {
            display: 'flex',
            borderColor: colors.tint,
            borderStyle: 'solid',
            borderWidth: 1,
            margin: 3,
            color: colors.text,

        },
        label: {
            textAlign: 'center',
            color: colors.text,
            fontSize: 18,
        },


    });
    const InitInsert = async () => {
        const stmt = await db.prepareAsync('INSERT INTO produits (nom, description, prix, image) VALUES ($nom, $description, $prix, $image)');
        const produits = ([
            { id: 2, nom: "Boule de crystal royale", description: "Une boule de crystal provenant des coffrages d'un royaume", prix: 149.99, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fas1.ftcdn.net%2Fv2%2Fjpg%2F05%2F60%2F77%2F38%2F1000_F_560773860_5Jxz6DqjIQlLIW9eBR0wt3hjSOmvDfwJ.jpg&f=1&nofb=1&ipt=8a246f83b3384bd67d9f2e29204c7b62771f059ae6a7b113020c3bdeb41a6bc5" },
            { id: 3, nom: "Boule de crystal électronique", description: "Une boule de crystal provenant de loin. Contient une engravure 'made in china'", prix: 2.37, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.wikihow.com%2Fimages%2Fa%2Fac%2FMagic_8_ball_quiz.png&f=1&nofb=1&ipt=b07caac203b62a971e122a813c39c3ba75f8bad6fcffa0ec513e07ed93068ea8" },

            { id: 3, nom: "Oeuf d'Ironbelly ukrainien", description: "Oeuf de dragon collecté sans cruauté", prix: 100.00, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.sketchfab.com%2Fmodels%2Fda4d3bb7d0c7450a9d18952da1af5923%2Fthumbnails%2Fd12c02c992904b1a89be3ce06ef1b676%2Fce1e3d7df63346f6b62d3869c8d0e684.jpeg&f=1&nofb=1&ipt=16201211975de07919c3681075fff28a524110a7b54dde5da77644ca53aeacc8" },
            { id: 6, nom: "Oeuf mysterieux", description: "Un Oeuf mysterieux, unique en son genre ", prix: 1071.00, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffbi.cults3d.com%2Fuploaders%2F25431975%2Fillustration-file%2F2de62a47-7c27-40c6-831c-b91aff9dddf2%2FGOMUGOMU_Beauty.jpg&f=1&nofb=1&ipt=0473eda4ba806ba14b014beeef86c20e2e06fc02fe3e8521693365d36f29030f" },

            { id: 11, nom: "Chapeau de Sorcier en cuire", description: "Composée de cuire de wyverne et de tissu de Lala-barina", prix: 35.00, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Fwhimsical-fabric-wizard-hat-ideal-costume-parties-isolated-white_1137529-5824.jpg&f=1&nofb=1&ipt=5ce904d61215b5a18d7c795d8bc33a205639f9e8dc5b7ae2e5b54605a993898f" },
            { id: 14, nom: "Chapeau de Sorcier montrealais", description: "Récolter sur le bord de la rue, très bonne condition", prix: 562.46, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20250306%2Fourlarge%2Fpngtree-bright-orange-traffic-cone-png-image_15713776.png&f=1&nofb=1&ipt=2e1d3f331d031761e7c27549ca94a443a525f1c898ea53e4a8ed633a93c511ef" },

            { id: 17, nom: "Brancherbe", description: "Plante incroyable utilisée dans des concoctions afin que de pouvoir respirer dans l'eau", prix: 6.99, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.etsystatic.com%2F23483679%2Fr%2Fil%2F67cf17%2F5571073614%2Fil_1080xN.5571073614_1a6b.jpg&f=1&nofb=1&ipt=c332b698f80ae704dc61e15f59cd4d64980a409b2570c7d45fdd97f344575c35" },
            { id: 18, nom: "Herbe mystiques", description: "Herbe psychoactive extrêmement populaire chez les sorciers", prix: 4.20, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F054%2F900%2F217%2Flarge_2x%2Fcannabis-plants-flourish-observing-the-growth-and-development-of-cannabis-leaves-from-seedling-to-mature-plant-with-a-focus-on-leaf-structure-and-patterns-in-a-lush-green-garden-setting-photo.jpg&f=1&nofb=1&ipt=58d3f757a304b1934165a1ebc82ec9e4dcc13289b5bd79b5630a40b89410a3c2" },

            { id: 19, nom: "Pipe en bois", description: "Pipe en bois de qualité, utilisée partout dans le monde", prix: 15.99, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fnoblecollection.co.uk%2Fwp-content%2Fuploads%2F2018%2F07%2FGandalf-Pipe-990x990.png&f=1&nofb=1&ipt=afedeaa1a4c956e6941c28b9b220cc660224ff8a10d1903bf1701f8238140e0d" },

            { id: 24, nom: "Poudre de perlimpinpin", description: "Provoque de la couleur lors de sa flagration. Parfait pour impressioner les individus ordinaires", prix: 2.99, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsereniss.com%2Fwp-content%2Fuploads%2F2023%2F10%2Fmelange.jpg&f=1&nofb=1&ipt=242cc4a120c517b5500d1c7a5d4d4ecd9b3da20d1343dac4bdc61c3929761e2a" },
            { id: 25, nom: "Poudre de Lunastra", description: "Poudre extrêmement destructive. Provoque de graves explosions lorsqu'elle est touchée par une étincelle", prix: 15.99, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcpimg.tistatic.com%2F08092549%2Fb%2F4%2FUltramarine-Blue-Pigment-Powder.jpg&f=1&nofb=1&ipt=9fe9b3b8bae9732c5c6f2a18eef2e5fa77a98d6f00c82073245c3e607aed8484" },

            { id: 30, nom: "Robe de transmutation", description: "Parfait pour changer les rats en goblets(savoir faire requis)", prix: 69.99, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi5.walmartimages.com%2Fasr%2F62532214-5ddb-4bca-9f14-6115101fbc5f.407cb6ab8d39090f8e719c98dc6134d9.jpeg&f=1&nofb=1&ipt=9b280b65377044dd89d248740df214a0e8fea47ab21201af3d779aa1ab5a6b79" },
            { id: 31, nom: "Robe légendaire", description: "Vêtements idéales pour les archimage. Porté par un héro mythique.", prix: 6932.48, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fd7%2F01%2F6f%2Fd7016f9120090d2b25a9270d61c7d173.jpg&f=1&nofb=1&ipt=70df41df9ee40740f7af402585d3e9640ef74973b7c4d9b8d4d2df061628f5a9" },

            { id: 38, nom: "Venin de basilic", description: "Venin très rare, produit par les basilics. Seul les larmes de phoenix peuvent contrer l'effet mortelle de celui-ci", prix: 300.99, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.makelifelovely.com%2Fwp-content%2Fuploads%2F2024%2F10%2FSnake-venom-Halloween-potion-bottle-684x1024.jpeg&f=1&nofb=1&ipt=457d0b179ccf9ab3c5707165b062dedc46134ffe3b22d793f1f0ea29965dd58b" },
            { id: 39, nom: "Venin de Rathian", description: "Venin commun récolté à partir de la queue d'un rathian. Une dose de celui-ci peut être mortelle pour un humain ordinaire.", prix: 32.99, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng.pngtree.com%2Fpng-vector%2F20240515%2Fourmid%2Fpngtree-medicinal-green-glass-vial-png-image_12467807.png&f=1&nofb=1&ipt=d476c361cfad8748347a8d5440fabe74f7e8c355828a9adb57ea05186ce28ca6" },
            { id: 40, nom: "Venin radioactif", description: "Petite bouteille de venin synthétique extrêmement radioactif. Provoque de grand changements chez certaines espèces.", prix: 265.99, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.etsystatic.com%2F28256073%2Fr%2Fil%2F763b1d%2F3880288900%2Fil_1140xN.3880288900_t07g.jpg&f=1&nofb=1&ipt=fe04b21fca7b34f98322b67518e9a42fc15412a3a000ccec3a98e3fc1098c4ae" },

            { id: 41, nom: "Baguette magique", description: "Fait de bois de sureau, 11 pouces avec un coeur de cheveux de queue de licorne et inflexible", prix: 66.99, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shoplightspeed.com%2Fshops%2F653480%2Ffiles%2F48812243%2F1500x4000x3%2Fgreat-pretenders-wizard-wand.jpg&f=1&nofb=1&ipt=4bc2d1423e2d546f2c505f56b70652bca5aa8d5a65a13f6bddc743524ba074b2" },
            { id: 42, nom: "Baguette magique", description: "Fait de prunellier noir, 12 pouces avec un coeur de plume de phoenix et pas très flexible", prix: 48.99, image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcloud.cazaar.co.uk%2Fwizard-wand-fancy-dress-wings-wands.jpg&f=1&nofb=1&ipt=89476a21549dc4f835523f23d71d0c6f974bfdce4f18210c313d2fc5381e9404" },
        ]);
        let result;
        for (let i = 0; i < produits.length; i++) {
            result = await stmt.executeAsync({ $nom: produits[i].nom, $description: produits[i].description, $prix: produits[i].prix, $image: produits[i].image });
            console.log("result : ", result.lastInsertRowId, result.changes);
        }

    }
    const Add = async () => {
        try {
            const stmt = await db.prepareAsync('INSERT INTO produits (nom, description, prix, image) VALUES ($nom, $description, $prix, $image)');
            let result = await stmt.executeAsync({ $nom: nom, $description: desc, $prix: prix, $image: image });
            console.log("result : ", result.lastInsertRowId, result.changes);
            setDesc('');
            setImage('');
            setNom('');
            setPrix(0);
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <View style={styles.wrapper}>
            <Pressable
                onPress={InitInsert}>
                <Text style={{ color: colors.text }}>Hydrate DB</Text>
            </Pressable>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>nom : </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => { setNom(e) }}
                />
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>prix : </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => { setPrix(Number(e)) }}
                    keyboardType="numeric"
                />

            </View>


            <View style={styles.inputWrapper}>
                <Text style={styles.label}>description : </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => { setDesc(e) }}
                />

            </View>

            <View style={styles.inputWrapper}>
                <Text style={styles.label}>url de l'image : </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => { setImage(e) }}
                />
            </View>

            <Pressable
                onPress={Add}>
                <Text style={{ color: colors.text }}>Ajouter</Text>
            </Pressable>
        </View>
    )
}