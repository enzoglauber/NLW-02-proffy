import React, { useState, useEffect } from "react";

import { AppLoading } from "expo";
import { View, Text, Image } from "react-native";

import { useNavigation } from '@react-navigation/native'

import { RectButton } from "react-native-gesture-handler";

import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo'
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins'

import { styles } from './styles'

import landingImg from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'
import { api } from "../../services/api";

export function Landing() {
  const { navigate } = useNavigation()

  let [fontsLoaded] = useFonts({
    Archivo_400Regular, Archivo_700Bold,
    Poppins_400Regular, Poppins_600SemiBold
  })

  const [totalConnections, setTotalConnections] = useState(0)

  useEffect(() => {
    api.get('connections').then(response => {
      const { total } = response.data
      setTotalConnections(total)
    })
  }, [])

  function handleNavigateToGiveClassesPage() {
    navigate('GiveClasses')
  }

  function handleNavigateToStudyPages() {
    navigate('Study')
  }

  if (!fontsLoaded) return <AppLoading />
  else {
    return (
      <View style={styles.container}>
        <Image source={landingImg} style={styles.banner} />

        <Text style={styles.title}>
          Seja bem-vindo, {'\n'}

          <Text style={styles.titleBold}>
            O que deseja fazer?
          </Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleNavigateToStudyPages}
            style={[styles.button, styles.buttonPrimary]}>

            <Image source={studyIcon} />
            <Text style={styles.buttonText}>Estudar</Text>
          </RectButton>

          <RectButton
            onPress={handleNavigateToGiveClassesPage}
            style={[styles.button, styles.buttonSecondary]}>

            <Image source={giveClassesIcon} />
            <Text style={styles.buttonText}>Dar aulas</Text>
          </RectButton>
        </View>

        <Text style={styles.totalConnections}>
          Total de {totalConnections} conexões já realizadas {' '}
          <Image source={heartIcon} />
        </Text>
      </View>
    )
  }
}
