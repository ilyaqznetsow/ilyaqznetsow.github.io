function checkAddress() {
    const address = document.getElementById("address").value;
    fetch(`https://tonapi.io/v1/nft/searchItems?owner=${address}&include_on_sale=false&limit=1000&offset=0`)
        .then(response => response.json())
        .then(data => {
            const items = data.nft_items;
            const verified = items.filter(item => item.collection !== undefined);

            var grouped = groupBy(verified, "collection_address");

            const itemList = document.getElementById("itemList");

            var total_score = 0;

            for (let i = 0; i < grouped.length; i++) {
                const group = grouped[i];
                const collection = group[0].collection;
                if (collection === undefined) {
                    continue;
                }

                const score = whitelist.find(wl => wl.raw === collection.address)?.score;

                if (!score) {
                    continue;
                }

                total_score += score;

                const listItem = document.createElement("li");
                listItem.innerText = `${collection.name}: ${group.length}, score: ${score}`;
                itemList.appendChild(listItem);
            }

            const total_label = document.getElementById("total_score");
            total_label.innerText = "total: " + total_score;

        })
        .catch(error => {
            console.error(error);
        });
}

function groupBy(collection, property) {
    var i = 0, val, index,
        values = [], result = [];
    for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1)
            result[index].push(collection[i]);
        else {
            values.push(val);
            result.push([collection[i]]);
        }
    }
    return result;
}


const whitelist = [
    {
        //ton hack challenge
        address: "EQBk35zPnJJMoTsK41MEoIeiF-oR3UwuKytAzm-0XwRKsjl_",
        raw: "0:64df9ccf9c924ca13b0ae35304a087a217ea11dd4c2e2b2b40ce6fb45f044ab2",
        score: 10,
    },
    {
        //STON.fi Soulbound
        address: "EQCF1KeUTKFtrUb7Uz_1l241rNJsLtdaaopQq8qiULnGTALv",
        raw: "0:85d4a7944ca16dad46fb533ff5976e35acd26c2ed75a6a8a50abcaa250b9c64c",
        score: 1,
    },
    {
        //Tonstarter Learn 🎓
        address: "EQCEfYSuxR3l0S0zr9DH2aHjVr9JTTE-E_zEdJMZY6xYpa9Y",
        raw: "0:847d84aec51de5d12d33afd0c7d9a1e356bf494d313e13fcc474931963ac58a5",
        score: 1,
    },
    {
        //Telegram Usernames
        address: "EQCA14o1-VWhS2efqoh_9M1b_A9DtKTuoqfmkn83AbJzwnPi",
        raw: "0:80d78a35f955a14b679faa887ff4cd5bfc0f43b4a4eea2a7e6927f3701b273c2",
        score: 1,
    },
    {
        //TON DNS Domains
        address: "EQC3dNlesgVD8YbAazcauIrXBPfiVhMMr5YYk2in0Mtsz0Bz",
        raw: "0:b774d95eb20543f186c06b371ab88ad704f7e256130caf96189368a7d0cb6ccf",
        score: 1,
    },
    {
        //TON Test Challenge
        address: "EQAF8985Oja0XHMimKS6_XzLNAjGuEC9taNWM1FIxADaKDT1",
        raw: "0:05f3df393a36b45c732298a4bafd7ccb3408c6b840bdb5a356335148c400da28",
        score: 1,
    },
    {
        //Ghost in the TON
        address: "EQDuVM_M2Cqx0bco0cYlNeW_aa2mvtvLy-UuPJQkzZEVmrmN",
        raw: "0:ee54cfccd82ab1d1b728d1c62535e5bf69ada6bedbcbcbe52e3c9424cd91159a",
        score: 1,
    }
];
