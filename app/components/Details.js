
import * as React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Emoj2, Emoj3, Emoj1 } from './Emoji';

const convert = (v) => {
    if (v === 0)
        return v + '%'
    v = v.toString();
    var a = v.split(".");
    v = a[1];
    v = v.substr(0, 4);
    v = (v / 100) + "%";
    return v
}

export const Details = ({ data }) => {
    return (
        <>
            <View style={stylesDetails.containerTitle}>
                <Image
                    style={stylesDetails.img}
                    source={{ uri: `${data.logo}` }}
                />
            </View>

            <View style={stylesDetails.containerTitle}>

                <Text style={stylesDetails.title}>
                    {data.name}
                </Text>
                <Text style={stylesDetails.secondaryText}>
                    {data.address}
                </Text>

            </View>

            <View style={stylesDetails.containerUsr}>

                <Text style={stylesDetails.secondaryText}>
                    Service: <Emoj3 data={data} />
                </Text>
                <Text style={stylesDetails.secondaryText}>
                    Payout Timing: <Emoj2 data={data} />

                </Text>
                <Text style={stylesDetails.secondaryText}>
                    Payout Amount:  <Emoj1 data={data} />
                </Text>

                <Text style={stylesDetails.secondaryText}>
                    Estimated roi: {convert(data.estimatedRoi)}
                </Text>
                <Text style={stylesDetails.secondaryText}>
                    Fees: {convert(data.fee)}
                </Text>
                <Text style={stylesDetails.secondaryText}>
                    Min delegation: {data.minDelegation}
                </Text>
                <Text style={stylesDetails.secondaryText}>
                    balance: {data.balance}
                </Text>
                <Text style={stylesDetails.secondaryText}>
                    Staking balance: {data.stakingBalance}
                </Text>
                <Text style={stylesDetails.secondaryText}>
                    staking capacity: {data.stakingCapacity}
                </Text>
                <Text style={stylesDetails.secondaryText}>
                    Max staking balance: {data.maxStakingBalance}
                </Text>
                <Text style={stylesDetails.secondaryText}>
                    Freespace: {data.freeSpace}
                </Text>
                <Text style={stylesDetails.secondaryText}>
                    Payout delay: {data.payoutDelay}
                </Text>
                <Text style={stylesDetails.secondaryText}>
                    Payout period: {data.payoutPeriod}
                </Text>
                <Text style={stylesDetails.secondaryText}>
                    Open for Delegation: {data.openForDelegation}
                </Text>
                <Text style={stylesDetails.secondaryText}>
                    Service Type: {data.serviceType}
                </Text>

            </View>

        </>
    );
}



const stylesDetails = StyleSheet.create({

    title: {
        fontSize: 20,
        color: 'grey'
    },
    containerTitle: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    containerUsr: {
        flex: 1,
        padding: 10
    },
    img: {
        width: 200,
        height: 200,

    },

})

