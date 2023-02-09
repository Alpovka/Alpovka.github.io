import axios from "axios";

const API_URL = "http://localhost:8000/api/offers/";

const createOffer = async (offerData: any, token: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.post(API_URL, offerData, config)

    return res.data
}

const getOffers = async (token: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(API_URL, config)

    return res.data
}

const removeOffer = async (offerId: string,token: any) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.delete(API_URL + offerId, config)

    return res.data
}


const offerService = {
    createOffer,
    getOffers,
    removeOffer,
}

export default offerService