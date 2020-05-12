
import * as React from 'react';
import Emoji from 'react-native-emoji';
import { Text, StyleSheet } from 'react-native';

export const Emoj1 = ({ data }) => {

  if (data.payoutAccuracy === "inaccurate") {
        return (<Emoji name="confused" style={{ fontSize: 15 }} />)
    }
    else if (data.payoutAccuracy === "precise") {
        return (<Emoji name="relaxed" style={{ fontSize: 15 }} />)

    }
    else if (data.payoutAccuracy === "no_data") {
        return (<Emoji name="question" style={{ fontSize: 15 }} />)
    }
    else {
        return (<Emoji name="question" style={{ fontSize: 15 }} />)
    }
}

export const Emoj2 = ({ data }) => {
    if (data.payoutTiming === "unstable") {
        return (<Emoji name="confused" style={{ fontSize: 15 }} />)
    }
    else if (data.payoutTiming === "stable") {
        return (<Emoji name="relaxed" style={{ fontSize: 15 }} />)
    }
    else if (data.payoutTiming === "no_data") {
        return (<Emoji name="question" style={{ fontSize: 15 }} />)
    }
    else {
        return (<Emoji name="question" style={{ fontSize: 15 }} />)
    }
}

export const Emoj3 = ({ data }) => {
    if (data.serviceHealth === "active") {

        return (
            <>
                <Text style={stylesDetails.active}>ACTIVE</Text>
                <Emoji name="white_check_mark" style={{ fontSize: 15 }} />
            </>
        )
    }
    if (data.serviceHealth === "closed") {
        return (
            <>
                <Text style={stylesDetails.closed}>CLOSED !</Text>
                <Emoji name="o" style={{ fontSize: 15 }} />
            </>

        )
    }
    if (data.serviceHealth === "dead") {
        return (
            <>
                <Text style={stylesDetails.dead}>! DEAD !</Text>
                <Emoji name="red_circle" style={{ fontSize: 15 }} />
            </>
        )
    }
}

export const Emoj4 = ({ data }) => {
    if (data.serviceHealth === "active") {

        return (
            <Emoji name="white_check_mark" style={{ fontSize: 15 }} />
        )
    }
    if (data.serviceHealth === "closed") {
        return (
            <Emoji name="o" style={{ fontSize: 15 }} />

        )
    }
    if (data.serviceHealth === "dead") {
        return (
            <Emoji name="red_circle" style={{ fontSize: 15 }} />

        )
    }
}

const stylesDetails = StyleSheet.create({

    dead: {
        color: 'red'
    },
    closed: {
        color: '#FF7F50'
    },
    active: {
        color: "green"
    }
})  