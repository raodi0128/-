// ==================================================
// 🎣 낚시 카톡봇
// ==================================================


// ==================================================
// 허용된 채팅방
// ==================================================

const ALLOWED_ROOMS = [
    "봇 테스트 방",
    "샤드클 낚시터"
];
//
// ==================================================


// ==================================================
// 저장 경로
// ==================================================

const PATH =
    android.os.Environment
        .getExternalStorageDirectory()
        .getAbsolutePath() +
    "/darkapple/fishing/userData.txt";


// ==================================================
// 데이터 불러오기
// ==================================================

let userData = {};

try {

    let fileData = FileStream.read(PATH);

    if (
        fileData === null ||
        fileData === undefined ||
        fileData === ""
    ) {

        FileStream.write(PATH, "{}");

        userData = {};

    } else {

        userData = JSON.parse(fileData);

    }

} catch (e) {

    userData = {};

    try {
        FileStream.write(PATH, "{}");
    } catch (e2) {}

}


// ==================================================
// 카지노 설정
// ==================================================

const CASINO_OWNER = "샤드";
const CASINO_FEE_RATE = 0.10;


// ==================================================
// 블랙잭 게임 데이터
// ==================================================

let blackjackGames = {};


// ==================================================
// 물고기 레이스 데이터
// ==================================================

let raceGames = {};

// ==================================================
// 물고기 레이스 시스템 데이터 초기화
// ==================================================

if (!userData.__system) {

    userData.__system = {};

}


if (!userData.__system.raceJackpots) {

    userData.__system.raceJackpots = {};

}

// ==================================================
// 물고기 레이스 물고기 목록
// ==================================================

const RACE_FISH = [

    {
        emoji: "🐠",
        name: "금붕어"
    },

    {
        emoji: "🐡",
        name: "복어"
    },

    {
        emoji: "🦈",
        name: "상어"
    },

    {
        emoji: "🐙",
        name: "문어"
    },

    {
        emoji: "🐬",
        name: "돌고래"
    }

];


// 방별 이월 잭팟
let raceJackpots = {};

// ==================================================
// 낚시 상태
// ==================================================

const isFishing = {};
const fishingCancel = {};


// ==================================================
// 물고기 데이터
//
// 등급 확률
// 일반 70%
// 희귀 20%
// 영웅 8%
// 전설 2%
//
// chance = 같은 등급 내 등장 가중치
// ==================================================

const fishs = [

    // ==================================================
    // 일반
    // ==================================================

    {
        name: "해파리",
        grade: "일반",
        chance: 15,
        minLength: 5,
        maxLength: 40,
        price: 5
    },

    {
        name: "말미잘",
        grade: "일반",
        chance: 15,
        minLength: 5,
        maxLength: 30,
        price: 5
    },

    {
        name: "새우",
        grade: "일반",
        chance: 14,
        minLength: 3,
        maxLength: 20,
        price: 6
    },

    {
        name: "가재",
        grade: "일반",
        chance: 10,
        minLength: 10,
        maxLength: 40,
        price: 8
    },

    {
        name: "멸치",
        grade: "일반",
        chance: 14,
        minLength: 5,
        maxLength: 20,
        price: 4
    },

    {
        name: "고등어",
        grade: "일반",
        chance: 12,
        minLength: 20,
        maxLength: 60,
        price: 7
    },

    {
        name: "돌",
        grade: "일반",
        chance: 8,
        minLength: 1,
        maxLength: 15,
        price: 1
    },

    {
        name: "먼지",
        grade: "일반",
        chance: 5,
        minLength: 1,
        maxLength: 5,
        price: 1
    },

    {
        name: "종이",
        grade: "일반",
        chance: 5,
        minLength: 1,
        maxLength: 10,
        price: 1
    },


    // ==================================================
    // 희귀
    // ==================================================

    {
        name: "고래",
        grade: "희귀",
        chance: 1.5,
        minLength: 300,
        maxLength: 900,
        price: 20
    },

    {
        name: "문어",
        grade: "희귀",
        chance: 3,
        minLength: 20,
        maxLength: 100,
        price: 12
    },

    {
        name: "오징어",
        grade: "희귀",
        chance: 4,
        minLength: 20,
        maxLength: 80,
        price: 10
    },

    {
        name: "돌고래",
        grade: "희귀",
        chance: 2,
        minLength: 100,
        maxLength: 300,
        price: 25
    },

    {
        name: "바다표범",
        grade: "희귀",
        chance: 2,
        minLength: 100,
        maxLength: 250,
        price: 22
    },

    {
        name: "가다랑어",
        grade: "희귀",
        chance: 4,
        minLength: 40,
        maxLength: 100,
        price: 15
    },

    {
        name: "가오리",
        grade: "희귀",
        chance: 3,
        minLength: 50,
        maxLength: 200,
        price: 18
    },

    {
        name: "갈치",
        grade: "희귀",
        chance: 4,
        minLength: 50,
        maxLength: 120,
        price: 13
    },


    // ==================================================
    // 영웅
    // ==================================================

    {
        name: "개복치",
        grade: "영웅",
        chance: 1,
        minLength: 100,
        maxLength: 400,
        price: 35
    },

    {
        name: "광어",
        grade: "영웅",
        chance: 2,
        minLength: 40,
        maxLength: 120,
        price: 25
    },

    {
        name: "농어",
        grade: "영웅",
        chance: 2,
        minLength: 50,
        maxLength: 150,
        price: 28
    },

    {
        name: "대구",
        grade: "영웅",
        chance: 2,
        minLength: 50,
        maxLength: 150,
        price: 30
    },

    {
        name: "도미",
        grade: "영웅",
        chance: 2,
        minLength: 40,
        maxLength: 120,
        price: 30
    },

    {
        name: "민어",
        grade: "영웅",
        chance: 1.5,
        minLength: 50,
        maxLength: 180,
        price: 35
    },

    {
        name: "방어",
        grade: "영웅",
        chance: 1.5,
        minLength: 70,
        maxLength: 200,
        price: 40
    },

    {
        name: "복어",
        grade: "영웅",
        chance: 1,
        minLength: 20,
        maxLength: 70,
        price: 45
    },


    // ==================================================
    // 전설
    // ==================================================

    {
        name: "상어",
        grade: "전설",
        chance: 0.5,
        minLength: 200,
        maxLength: 700,
        price: 80
    },

    {
        name: "아귀",
        grade: "전설",
        chance: 0.5,
        minLength: 50,
        maxLength: 150,
        price: 100
    },

    {
        name: "연어",
        grade: "전설",
        chance: 1,
        minLength: 40,
        maxLength: 120,
        price: 60
    },

    {
        name: "우럭",
        grade: "전설",
        chance: 1,
        minLength: 30,
        maxLength: 100,
        price: 55
    },

    {
        name: "임연수어",
        grade: "전설",
        chance: 0.7,
        minLength: 30,
        maxLength: 100,
        price: 70
    },

    {
        name: "잉어",
        grade: "전설",
        chance: 0.8,
        minLength: 40,
        maxLength: 150,
        price: 75
    },

    {
        name: "장어",
        grade: "전설",
        chance: 0.8,
        minLength: 50,
        maxLength: 200,
        price: 90
    }
];

// ==================================================
// 낚싯대
// ==================================================

const rods = [

    {
        id: 1,
        name: "낡은 낚싯대",

        price: 0,

        // 기본 크기 보너스
        bonus: 0,

        // 강화 기본 비용
        upgradePrice: 2000,

        sellRate: 0.20
    },

    {
        id: 2,
        name: "튼튼한 낚싯대",

        price: 30000,

        bonus: 0.08,

        upgradePrice: 5000,

        sellRate: 0.35
    },

    {
        id: 3,
        name: "강철 낚싯대",

        price: 120000,

        bonus: 0.18,

        upgradePrice: 15000,

        sellRate: 0.45
    },

    {
        id: 4,
        name: "황금 낚싯대",

        price: 500000,

        bonus: 0.35,

        upgradePrice: 50000,

        sellRate: 0.55
    },

    {
        id: 5,
        name: "전설의 낚싯대",

        price: 2000000,

        bonus: 0.60,

        upgradePrice: 150000,

        sellRate: 0.65
    }
];


// ==================================================
// 강화 확률
// ==================================================

const upgradeRates = {

    0: {
        success: 100,
        fail: 0,
        destroy: 0
    },

    1: {
        success: 90,
        fail: 10,
        destroy: 0
    },

    2: {
        success: 80,
        fail: 20,
        destroy: 0
    },

    3: {
        success: 70,
        fail: 30,
        destroy: 0
    },

    4: {
        success: 60,
        fail: 40,
        destroy: 0
    },

    5: {
        success: 55,
        fail: 40,
        destroy: 5
    },

    6: {
        success: 50,
        fail: 40,
        destroy: 10
    },

    7: {
        success: 45,
        fail: 40,
        destroy: 15
    },

    8: {
        success: 40,
        fail: 40,
        destroy: 20
    },

    9: {
        success: 35,
        fail: 35,
        destroy: 30
    }
};


// ==================================================
// 메인 response
// ==================================================

function response(
    room,
    msg,
    sender,
    igc,
    replier,
    ImageDB
) {

    // ==================================================
    // 허용된 채팅방
    // ==================================================

    if (
        typeof ALLOWED_ROOMS !== "undefined" &&
        !ALLOWED_ROOMS.includes(room)
    ) {

        return;
    }


    // ==================================================
    // 유저 확인
    // ==================================================

    let profile =
        java.lang.String(
            ImageDB.getProfileImage()
        ).hashCode();


    if (
        !checkUser(
            sender,
            profile
        )
    ) {

        if (
            msg === "/낚시"
        ) {

            replier.reply(
                "잘못된 접근입니다."
            );

        }

        return;
    }


    // ==================================================
    // 낚시
    // ==================================================

    if (
        msg === "/낚시"
    ) {

        if (
            isFishing[sender]
        ) {

            replier.reply(
                "🎣 이미 낚시 중입니다.\n" +
                "/낚시중 으로 상태를 확인할 수 있습니다."
            );

            return;
        }


        startFishing(
            sender,
            userData[sender],
            replier
        );

        return;
    }


    // ==================================================
    // 낚시중
    // ==================================================

    if (
        msg === "/낚시중"
    ) {

        if (
            !isFishing[sender]
        ) {

            replier.reply(
                "🎣 현재 낚시 중이 아닙니다."
            );

            return;
        }


        replier.reply(
            "🎣 현재 낚시 중입니다.\n" +
            "낚시가 끝날 때까지 잠시 기다려주세요."
        );

        return;
    }


    // ==================================================
    // 낚시 취소
    // ==================================================

    if (
        msg === "/낚시취소"
    ) {

        if (
            !isFishing[sender]
        ) {

            replier.reply(
                "현재 낚시 중이 아닙니다."
            );

            return;
        }


        fishingCancel[sender] = true;


        replier.reply(
            "🎣 낚시를 취소했습니다."
        );

        return;
    }

// ==================================================
// 강화 확률표
// ==================================================

if (msg === "/강화확률") {

    let message =
        "🔨 낚싯대 강화 정보\n\n" +


        "🎣 낚싯대별 기본 강화비용\n\n" +

        "🎣 낡은 낚싯대\n" +
        "💰 강화 기본비용: 2,000G\n\n" +

        "🛠️ 튼튼한 낚싯대\n" +
        "💰 강화 기본비용: 5,000G\n\n" +

        "⚙️ 강철 낚싯대\n" +
        "💰 강화 기본비용: 15,000G\n\n" +

        "👑 황금 낚싯대\n" +
        "💰 강화 기본비용: 50,000G\n\n" +

        "🌟 전설의 낚싯대\n" +
        "💰 강화 기본비용: 150,000G\n\n" +

        "━━━━━━━━━━━━━━\n\n" +

        "🔨 강화 확률표\n\n";


    for (
        let level = 0;
        level <= 9;
        level++
    ) {

        let rate =
            upgradeRates[level];


        message +=

            "⭐ " +
            level +
            "강 → " +
            (level + 1) +
            "강\n\n" +

            "✅ 성공: " +
            rate.success +
            "%\n" +

            "❌ 실패: " +
            rate.fail +
            "%\n" +

            "💥 파괴: " +
            rate.destroy +
            "%\n\n";


        if (
            level < 9
        ) {

            message +=
                "━━━━━━━━━━━━━━\n\n";
        }
    }


    replier.reply(
        message
    );

    return;
}


    // ==================================================
    // 레벨
    // ==================================================

    if (
        msg === "/레벨"
    ) {

        let data =
            userData[sender];


        replier.reply(

            "🎣 " +
            sender +
            "님의 낚시 정보\n\n" +

            "레벨: " +
            data.level +
            "\n" +

            "경험치: " +
            data.point +
            "/" +
            getPoint(data.level) +
            "\n" +

            "최고 기록: " +
            data.bestLength +
            "cm\n" +

            "골드: " +
            data.gold +
            "G"

        );

        return;
    }


    // ==================================================
    // 인벤토리
    // ==================================================

    if (
        msg === "/인벤토리"
    ) {

        replier.reply(
            getInventory(sender)
        );

        return;
    }


    // ==================================================
    // 랭킹
    // ==================================================

    if (
        msg === "/랭킹"
    ) {

        replier.reply(

            "🏆 낚시 랭킹\n" +

            "\u200b".repeat(1000) +

            getRank()

        );

        return;
    }


    // ==================================================
    // 물고기 판매
    // ==================================================

    if (
        msg.indexOf("/판매 ") === 0
    ) {

        let args =
            msg.split(" ");


        if (
            args.length === 2 &&
            !isNaN(args[1])
        ) {

            sellFish(
                sender,
                parseInt(args[1]),
                replier
            );

        } else {

            replier.reply(
                "사용법: /판매 <번호>\n" +
                "/인벤토리에서 번호를 확인하세요."
            );
        }

        return;
    }


    // ==================================================
    // 전체 판매
    // ==================================================

    if (
        msg === "/전체판매"
    ) {

        sellAllFish(
            sender,
            replier
        );

        return;
    }


    // ==================================================
    // 보관
    // ==================================================

    if (
        msg.indexOf("/보관 ") === 0
    ) {

        let args =
            msg.split(" ");


        if (
            args.length === 2 &&
            !isNaN(args[1])
        ) {

            protectFish(
                sender,
                parseInt(args[1]),
                replier
            );

        } else {

            replier.reply(
                "사용법: /보관 <번호>\n" +
                "/인벤토리에서 번호를 확인하세요."
            );
        }

        return;
    }


    // ==================================================
    // 보관 해제
    // ==================================================

    if (
        msg.indexOf("/보관해제 ") === 0
    ) {

        let args =
            msg.split(" ");


        if (
            args.length === 2 &&
            !isNaN(args[1])
        ) {

            unprotectFish(
                sender,
                parseInt(args[1]),
                replier
            );

        } else {

            replier.reply(
                "사용법: /보관해제 <번호>\n" +
                "/인벤토리에서 번호를 확인하세요."
            );
        }

        return;
    }


    // ==================================================
    // 보관 목록
    // ==================================================

    if (
        msg === "/보관목록"
    ) {

        replier.reply(
            getProtectedFish(sender)
        );

        return;
    }


    // ==================================================
    // 골드
    // ==================================================

    if (
        msg === "/골드"
    ) {

        replier.reply(

            "💰 " +
            sender +
            "님의 골드: " +
            userData[sender].gold +
            "G"

        );

        return;
    }
    // ==================================================
// 골드 송금
// ==================================================

if (
    msg.indexOf("/송금 ") === 0
) {

    let args =
        msg.split(" ");


    if (
        args.length === 3 &&
        !isNaN(args[2]) &&
        parseInt(args[2]) > 0
    ) {

        transferGold(

            sender,

            args[1],

            parseInt(args[2]),

            replier

        );

    } else {

        replier.reply(

            "사용법: /송금 <닉네임> <금액>\n\n" +

            "예시:\n" +

            "/송금 샤드 10000"

        );
    }

    return;
}

// ==================================================
// 게임 목록
// ==================================================

if (msg === "/게임목록") {

    replier.reply(

        "🎰 게임 목록\n\n" +

        "👤 1인 게임\n\n" +

        "🎲 도박\n" +
        "/도박 <금액>\n" +
        "승률 45%\n\n" +

        "🎰 슬롯머신\n" +
        "/슬롯 <금액>\n" +
        "랜덤 슬롯을 돌립니다.\n\n" +

        "🃏 블랙잭\n" +
        "/블랙잭 <금액>\n" +
        "딜러와 21점 승부!\n\n" +

        "👥 다인 게임\n\n" +

        "🏁 물고기 레이스\n" +
        "/레이스 <참가비>\n" +
        "레이스를 생성합니다.\n\n" +

        "🐟 레이스 참가\n" +
        "/참가 <번호>\n" +
        "원하는 물고기를 선택합니다.\n\n" +

        "📊 레이스 현황\n" +
        "/레이스현황\n\n" +

        "🏁 레이스 시작\n" +
        "/게임시작\n\n" +

        "━━━━━━━━━━━━━━\n" +

        "🎲 즐거운 카지노 되세요!"
    );

    return;
}
    // ==================================================
    // 도박
    // ==================================================

    if (
        msg.indexOf("/도박 ") === 0
    ) {

        let args =
            msg.split(" ");


        if (
            args.length === 2 &&
            !isNaN(args[1]) &&
            parseInt(args[1]) > 0
        ) {

            gamble(
                sender,
                parseInt(args[1]),
                replier
            );

        } else {

            replier.reply(
                "사용법: /도박 <금액>"
            );
        }

        return;
    }
    // ==================================================
    // 슬롯머신
    // ==================================================

    if (msg.indexOf("/슬롯 ") === 0) {

        let args = msg.split(" ");

        if (
            args.length === 2 &&
            !isNaN(args[1]) &&
            parseInt(args[1]) > 0
        ) {

            slotMachine(
                sender,
                parseInt(args[1]),
                replier
            );

        } else {

            replier.reply(
                "사용법: /슬롯 <금액>"
            );
        }

        return;
    }


    // ==================================================
    // 블랙잭 시작
    // ==================================================

    if (msg.indexOf("/블랙잭 ") === 0) {

        let args = msg.split(" ");

        if (
            args.length === 2 &&
            !isNaN(args[1]) &&
            parseInt(args[1]) > 0
        ) {

            startBlackjack(
                sender,
                parseInt(args[1]),
                replier
            );

        } else {

            replier.reply(
                "사용법: /블랙잭 <금액>"
            );
        }

        return;
    }


    // ==================================================
    // 블랙잭 히트
    // ==================================================

    if (msg === "/히트") {

        blackjackHit(
            sender,
            replier
        );

        return;
    }


    // ==================================================
    // 블랙잭 스탠드
    // ==================================================

    if (msg === "/스탠드") {

        blackjackStand(
            sender,
            replier
        );

        return;
    }


// ==================================================
// 물고기 레이스 생성
// ==================================================

if (msg.indexOf("/레이스 ") === 0) {

    let args = msg.split(" ");

    if (
        args.length === 2 &&
        !isNaN(args[1]) &&
        parseInt(args[1]) > 0
    ) {

        createRace(
            room,
            sender,
            parseInt(args[1]),
            replier
        );

    } else {

        replier.reply(
            "사용법: /레이스 <참가비>"
        );
    }

    return;
}


// ==================================================
// 물고기 레이스 참가
// ==================================================

if (msg.indexOf("/참가 ") === 0) {

    let args = msg.split(" ");

    if (
        args.length === 2 &&
        !isNaN(args[1]) &&
        parseInt(args[1]) >= 1 &&
        parseInt(args[1]) <= 5
    ) {

        joinRace(
            room,
            sender,
            parseInt(args[1]),
            replier
        );

    } else {

        replier.reply(
            "사용법: /참가 <1~5>"
        );
    }

    return;
}

// ==================================================
// 레이스 현황
// ==================================================

if (msg === "/레이스현황") {

    showRaceStatus(
        room,
        replier
    );

    return;
}


// ==================================================
// 레이스 시작
// ==================================================

if (msg === "/게임시작") {

    startRace(
        room,
        sender,
        replier
    );

    return;
}


    // ==================================================
    // 도감
    // ==================================================

    if (
        msg === "/도감"
    ) {

        replier.reply(
            getBook(sender)
        );

        return;
    }


    // ==================================================
    // 출석
    // ==================================================

    if (
        msg === "/출석"
    ) {

        attendance(
            sender,
            replier
        );

        return;
    }


    // ==================================================
    // 상점
    // ==================================================

    if (
        msg === "/상점"
    ) {

        shop(replier);

        return;
    }


    // ==================================================
    // 낚싯대
    // ==================================================

    if (
        msg === "/낚싯대"
    ) {

        showRod(
            sender,
            replier
        );

        return;
    }


    // ==================================================
    // 낚싯대 구매
    // ==================================================

    if (
        msg.indexOf("/낚싯대구매 ") === 0
    ) {

        let args =
            msg.split(" ");


        if (
            args.length === 2 &&
            !isNaN(args[1])
        ) {

            buyRod(
                sender,
                parseInt(args[1]),
                replier
            );

        } else {

            replier.reply(
                "사용법: /낚싯대구매 <번호>"
            );
        }

        return;
    }


    // ==================================================
    // 낚싯대 장착
    // ==================================================

    if (
        msg.indexOf("/낚싯대장착 ") === 0
    ) {

        let args =
            msg.split(" ");


        if (
            args.length === 2 &&
            !isNaN(args[1])
        ) {

            equipRod(
                sender,
                parseInt(args[1]),
                replier
            );

        } else {

            replier.reply(
                "사용법: /낚싯대장착 <번호>"
            );
        }

        return;
    }


    // ==================================================
    // 낚싯대 판매
    // ==================================================

    if (
        msg.indexOf("/낚싯대판매 ") === 0
    ) {

        let args =
            msg.split(" ");


        if (
            args.length === 2 &&
            !isNaN(args[1])
        ) {

            sellRod(
                sender,
                parseInt(args[1]),
                replier
            );

        } else {

            replier.reply(
                "사용법: /낚싯대판매 <번호>"
            );
        }

        return;
    }


    // ==================================================
    // 강화
    // ==================================================

    if (
        msg === "/강화"
    ) {

        upgradeRod(
            sender,
            replier
        );

        return;
    }
}


// ==================================================
// 사용자 초기화
// + 기존 데이터 자동 보정
// ==================================================

function checkUser(
    name,
    profile
) {

    // ==================================================
    // 신규 유저
    // ==================================================

    if (
        !Object.prototype.hasOwnProperty.call(
            userData,
            name
        )
    ) {

        // --------------------------------------------------
        // 먼저 프로필 중복 확인
        // --------------------------------------------------

        let keys =
            Object.keys(userData);


        for (
            let i = 0;
            i < keys.length;
            i++
        ) {

            let key =
                keys[i];

            // 시스템 데이터 제외
            if (key === "__system") {

                continue;
            }


            if (
                userData[key] &&
                userData[key].profileImage == profile
            ) {

                return false;
            }
        }


        // --------------------------------------------------
        // 신규 유저 생성
        // --------------------------------------------------

        userData[name] = {

            inventory: [],

            level: 1,

            point: 0,

            gold: 0,

            bestLength: 0,

            profileImage: profile,

            collection: {},

            attendance: {

                lastDate: "",

                streak: 0,

                total: 0
            },

            rods: {

                1: {

                    level: 0
                }
            },

            equippedRod: 1
        };
    }


    let data =
        userData[name];


    // ==================================================
    // 기본 데이터 보정
    // ==================================================

    if (
        data.inventory === undefined ||
        !Array.isArray(data.inventory)
    ) {

        data.inventory = [];
    }


    if (
        data.level === undefined
    ) {

        data.level = 1;
    }


    if (
        data.point === undefined
    ) {

        data.point = 0;
    }


    if (
        data.gold === undefined
    ) {

        data.gold = 0;
    }


    if (
        data.bestLength === undefined
    ) {

        data.bestLength = 0;
    }


    if (
        data.collection === undefined ||
        data.collection === null
    ) {

        data.collection = {};
    }


    // ==================================================
    // 출석 데이터
    // ==================================================

    if (
        data.attendance === undefined ||
        data.attendance === null
    ) {

        data.attendance = {

            lastDate: "",
            streak: 0,
            total: 0

        };
    }


    if (
        data.attendance.lastDate === undefined
    ) {

        data.attendance.lastDate = "";
    }


    if (
        data.attendance.streak === undefined
    ) {

        data.attendance.streak = 0;
    }


    if (
        data.attendance.total === undefined
    ) {

        data.attendance.total = 0;
    }


    // ==================================================
    // 물고기 데이터 보정
    //
    // 기존:
    // [크기, 이름, 등급, 가격]
    //
    // 현재:
    // [크기, 이름, 등급, 가격, 보관여부]
    // ==================================================

    for (
        let i = 0;
        i < data.inventory.length;
        i++
    ) {

        let fish =
            data.inventory[i];


        if (
            !Array.isArray(fish)
        ) {

            continue;
        }


        if (
            fish[2] === undefined
        ) {

            fish[2] =
                getFishGrade(
                    fish[1]
                );
        }


        if (
            fish[3] === undefined
        ) {

            fish[3] =
                getFishPrice(
                    fish[1]
                );
        }


        // 기존 물고기는 보관하지 않은 상태
        if (
            fish[4] === undefined
        ) {

            fish[4] = false;
        }


        // 혹시 이상한 값이 들어있으면
        // boolean으로 보정
        fish[4] =
            fish[4] === true;
    }


    // ==================================================
    // v2 → v3 낚싯대 자동 마이그레이션
    // ==================================================

    if (
        data.rods === undefined ||
        data.rods === null
    ) {

        data.rods = {};


        if (
            data.rod !== undefined
        ) {

            let oldId =
                parseInt(
                    data.rod.id
                ) || 1;


            let oldLevel =
                parseInt(
                    data.rod.level
                ) || 0;


            if (
                oldId < 1 ||
                oldId > rods.length
            ) {

                oldId = 1;
            }


            if (
                oldLevel < 0
            ) {

                oldLevel = 0;
            }


            if (
                oldLevel > 10
            ) {

                oldLevel = 10;
            }


            data.rods[oldId] = {

                level: oldLevel

            };


            data.equippedRod =
                oldId;


            delete data.rod;

        } else {

            data.rods[1] = {

                level: 0

            };


            data.equippedRod = 1;
        }
    }


    // ==================================================
    // rods 보정
    // ==================================================

    if (
        Object.keys(data.rods).length === 0
    ) {

        data.rods[1] = {

            level: 0

        };
    }


    for (
        let id in data.rods
    ) {

        if (
            data.rods[id] === undefined ||
            data.rods[id] === null
        ) {

            data.rods[id] = {

                level: 0

            };
        }


        if (
            data.rods[id].level === undefined
        ) {

            data.rods[id].level = 0;
        }


        data.rods[id].level =
            parseInt(
                data.rods[id].level
            ) || 0;


        if (
            data.rods[id].level < 0
        ) {

            data.rods[id].level = 0;
        }


        if (
            data.rods[id].level > 10
        ) {

            data.rods[id].level = 10;
        }
    }


    // ==================================================
    // 장착 낚싯대 보정
    // ==================================================

    if (
        data.equippedRod === undefined
    ) {

        let keys =
            Object.keys(
                data.rods
            );


        if (
            keys.length > 0
        ) {

            data.equippedRod =
                parseInt(
                    keys[0]
                );

        } else {

            data.rods[1] = {

                level: 0

            };


            data.equippedRod = 1;
        }
    }


    data.equippedRod =
        parseInt(
            data.equippedRod
        ) || 1;


    if (
        data.rods[
            data.equippedRod
        ] === undefined
    ) {

        data.rods[1] = {

            level: 0

        };


        data.equippedRod = 1;
    }


    // ==================================================
    // 프로필
    // ==================================================

    if (
        data.profileImage === undefined
    ) {

        data.profileImage = profile;
    }


    // ==================================================
    // 기존 유저 프로필 중복 확인
    // ==================================================

    if (
        data.profileImage !== profile
    ) {

        let sameProfile = false;


        let keys =
            Object.keys(
                userData
            );


        for (
            let i = 0;
            i < keys.length;
            i++
        ) {

            let key =
                keys[i];


            if (
                key !== name &&
                userData[key] &&
                userData[key].profileImage == profile
            ) {

                sameProfile = true;

                break;
            }
        }


        if (
            sameProfile
        ) {

            return false;
        }
    }


    // ==================================================
    // 상태 초기화
    // ==================================================

    if (
        !Object.prototype.hasOwnProperty.call(
            isFishing,
            name
        )
    ) {

        isFishing[name] = false;
    }


    if (
        !Object.prototype.hasOwnProperty.call(
            fishingCancel,
            name
        )
    ) {

        fishingCancel[name] = false;
    }


    saveData();


    return true;
}


// ==================================================
// 저장
// ==================================================

function saveData() {

    try {

        FileStream.write(
            PATH,
            JSON.stringify(
                userData
            )
        );

    } catch (e) {

        Log.e(
            "낚시봇 저장 오류: " +
            e
        );
    }
}


// ==================================================
// 비동기 낚시
// ==================================================

function startFishing(
    name,
    data,
    send
) {

    if (
        isFishing[name]
    ) {

        return;
    }


    isFishing[name] = true;

    fishingCancel[name] = false;


    send.reply(

        "🎣 " +
        name +
        "님이 낚시를 시작했습니다!\n" +
        "낚싯대를 던졌습니다..."

    );


    let fishingThread =
        new java.lang.Thread(

            new java.lang.Runnable({

                run: function() {

                    try {

                        // ==================================================
                        // 10~30초
                        // ==================================================

                        let waitTime =
                            (
                                10 +
                                Math.floor(
                                    Math.random() * 21
                                )
                            ) * 1000;


                        let elapsed = 0;


                        // ==================================================
                        // 1초마다 취소 확인
                        // ==================================================

                        while (
                            elapsed < waitTime
                        ) {

                            if (
                                fishingCancel[name]
                            ) {

                                isFishing[name] = false;

                                fishingCancel[name] = false;

                                return;
                            }


                            java.lang.Thread.sleep(
                                1000
                            );


                            elapsed += 1000;
                        }


                        // ==================================================
                        // 마지막 취소 확인
                        // ==================================================

                        if (
                            fishingCancel[name]
                        ) {

                            isFishing[name] = false;

                            fishingCancel[name] = false;

                            return;
                        }


                        // ==================================================
                        // 물고기 획득
                        // ==================================================

                        let result =
                            getRandomFish(
                                name,
                                data,
                                data.level
                            );


                        isFishing[name] = false;

                        fishingCancel[name] = false;


                        send.reply(
                            result
                        );


                    } catch (e) {

                        isFishing[name] = false;

                        fishingCancel[name] = false;


                        Log.e(
                            "낚시 Thread 오류: " +
                            e
                        );


                        send.reply(
                            "⚠️ 낚시 중 오류가 발생했습니다."
                        );
                    }
                }
            })
        );


    fishingThread.start();
}


// ==================================================
// 레벨업
// ==================================================

function checkLevel(
    data
) {

    let levelUp = false;


    while (
        data.level < 100 &&
        data.point >= getPoint(data.level)
    ) {

        data.point -=
            getPoint(
                data.level
            );


        data.level++;


        levelUp = true;


        // 레벨업 보상
        data.gold +=
            data.level * 100;
    }


    if (
        levelUp
    ) {

        saveData();
    }
}


// ==================================================
// 경험치
// ==================================================

function getPoint(
    level
) {

    return (

        level * level * level +

        level * 500

    );
}


// ==================================================
// 랜덤 물고기
// ==================================================

function randomFish() {

    let gradeRandom =
        Math.random() * 100;


    let selectedGrade;


    if (
        gradeRandom < 70
    ) {

        selectedGrade = "일반";

    } else if (
        gradeRandom < 90
    ) {

        selectedGrade = "희귀";

    } else if (
        gradeRandom < 98
    ) {

        selectedGrade = "영웅";

    } else {

        selectedGrade = "전설";
    }


    let candidates = [];

    let totalChance = 0;


    for (
        let i = 0;
        i < fishs.length;
        i++
    ) {

        if (
            fishs[i].grade ===
            selectedGrade
        ) {

            candidates.push(
                fishs[i]
            );


            totalChance +=
                fishs[i].chance;
        }
    }


    let random =
        Math.random() *
        totalChance;


    let current = 0;


    for (
        let i = 0;
        i < candidates.length;
        i++
    ) {

        current +=
            candidates[i].chance;


        if (
            random <= current
        ) {

            return candidates[i];
        }
    }


    return candidates[
        candidates.length - 1
    ];
}


// ==================================================
// 랜덤 물고기 획득
// ==================================================

function getRandomFish(
    name,
    data,
    level
) {

    let fish =
        randomFish();


    // ==================================================
    // 기본 크기
    // ==================================================

    let result =

        fish.minLength +

        Math.floor(
            Math.random() *
            (
                fish.maxLength -
                fish.minLength +
                1
            )
        );


    // ==================================================
    // 레벨 보너스
    //
    // 레벨 1 = 0%
    // 레벨마다 +1%
    // ==================================================

    let levelBonus =

        1 +
        (
            level - 1
        ) * 0.01;


    result =
        Math.floor(
            result *
            levelBonus
        );


    // ==================================================
    // 낚싯대 보너스
    // ==================================================

    let rodBonus =
        getRodBonus(
            data
        );


    result =
        Math.floor(
            result *
            (
                1 +
                rodBonus
            )
        );


    // ==================================================
    // 대어 보너스
    // 5%
    // 1.2 ~ 2.0배
    // ==================================================

    let bigFish = false;


    if (
        Math.random() < 0.05
    ) {

        result =
            Math.floor(
                result *
                (
                    1.2 +
                    Math.random() * 0.8
                )
            );


        bigFish = true;
    }


    // ==================================================
    // 인벤토리
    //
    // [크기, 이름, 등급, 가격, 보관여부]
    // ==================================================

    data.inventory.push([

        result,

        fish.name,

        fish.grade,

        fish.price,

        false

    ]);


    // ==================================================
    // 경험치
    // ==================================================

    data.point +=
        result;


    // ==================================================
    // 도감
    // ==================================================

    if (
        data.collection[
            fish.name
        ] === undefined
    ) {

        data.collection[
            fish.name
        ] = 0;
    }


    data.collection[
        fish.name
    ]++;


    // ==================================================
    // 최고 기록
    // ==================================================

    let newRecord = false;


    if (
        result >
        data.bestLength
    ) {

        data.bestLength =
            result;


        newRecord = true;
    }


    // ==================================================
    // 레벨업
    // ==================================================

    let oldLevel =
        data.level;


    checkLevel(
        data
    );


    let levelUp =
        data.level >
        oldLevel;


    saveData();


    // ==================================================
    // 결과
    // ==================================================

    let resultMessage =

    getGradeEmoji(
        fish.grade
    ) +

    " [" +
    fish.grade +
    "]\n\n" +

    "🎣 " +
    name +
    "님이 " +

    result +
    "cm " +
    fish.name +
    "(을)를 낚았습니다!";


    if (
        bigFish
    ) {

        resultMessage +=
            "\n🐋 대어 보너스!";
    }


    if (
        newRecord
    ) {

        resultMessage +=
            "\n🏆 최고 기록 갱신!";
    }


    if (
        levelUp
    ) {

        resultMessage +=

            "\n🎉 레벨 업! " +

            oldLevel +
            " → " +
            data.level +

            "\n💰 레벨업 보너스: " +

            (
                data.level * 100
            ) +

            "G";
    }


    return resultMessage;
}


// ==================================================
// 등급 이모지
// ==================================================

function getGradeEmoji(
    grade
) {

    if (
        grade === "일반"
    ) {

        return "🟢";
    }


    if (
        grade === "희귀"
    ) {

        return "🔵";
    }


    if (
        grade === "영웅"
    ) {

        return "🟣";
    }


    if (
        grade === "전설"
    ) {

        return "🟡";
    }


    return "⚪";
}


// ==================================================
// 물고기 정보
// ==================================================

function getFishGrade(
    name
) {

    for (
        let i = 0;
        i < fishs.length;
        i++
    ) {

        if (
            fishs[i].name === name
        ) {

            return fishs[i].grade;
        }
    }


    return "일반";
}


function getFishPrice(
    name
) {

    for (
        let i = 0;
        i < fishs.length;
        i++
    ) {

        if (
            fishs[i].name === name
        ) {

            return fishs[i].price;
        }
    }


    return 1;
}


// ==================================================
// 인벤토리
// ==================================================

function getInventory(
    name
) {

    let inventory =
        userData[name]
            .inventory;


    if (
        inventory.length === 0
    ) {

        return (
            "🎒 인벤토리가 비어 있습니다."
        );
    }


    let result =

        "🎒 " +
        name +
        "님의 인벤토리\n\n";


    for (
        let i = 0;
        i < inventory.length;
        i++
    ) {

        let item =
            inventory[i];


        let fishName =
            item[1];


        let grade =
            item[2] ||
            getFishGrade(
                fishName
            );


        let price =
            item[3] ||
            getFishPrice(
                fishName
            );


        let protectedFish =
            item[4] === true;


        result +=

            (i + 1) +
            ". " +

            getGradeEmoji(
                grade
            ) +

            " " +
            item[0] +
            "cm " +

            fishName;


        // ==================================================
        // 보관 표시
        // ==================================================

        if (
            protectedFish
        ) {

            result +=
                " 🔒";
        }


        result +=

            " [" +
            grade +
            "]\n" +

            "   판매가: " +

            (
                item[0] *
                price
            ) +

            "G\n";
    }


    result +=

        "\n━━━━━━━━━━━━━━\n" +

        "/판매 <번호>\n" +

        "/보관 <번호>\n" +

        "/보관해제 <번호>\n" +

        "/보관목록\n" +

        "/전체판매";


    return (
        "\u200b".repeat(1000) +
        result
    );
}


// ==================================================
// 물고기 보관
// ==================================================

function protectFish(
    name,
    index,
    replier
) {

    let data =
        userData[name];


    if (
        index < 1 ||
        index >
        data.inventory.length
    ) {

        replier.reply(
            "❌ 잘못된 번호입니다."
        );

        return;
    }


    let fish =
        data.inventory[
            index - 1
        ];


    // 기존 데이터 보정
    if (
        fish[4] === undefined
    ) {

        fish[4] = false;
    }


    if (
        fish[4] === true
    ) {

        replier.reply(
            "🔒 이미 보관 중인 물고기입니다."
        );

        return;
    }


    fish[4] = true;


    saveData();


    replier.reply(

        "🔒 물고기 보관 완료!\n\n" +

        getGradeEmoji(
            fish[2]
        ) +

        " " +
        fish[0] +
        "cm " +
        fish[1] +

        "\n\n" +

        "이 물고기는 /전체판매에서\n" +
        "자동으로 판매되지 않습니다."

    );
}


// ==================================================
// 물고기 보관 해제
// ==================================================

function unprotectFish(
    name,
    index,
    replier
) {

    let data =
        userData[name];


    if (
        index < 1 ||
        index >
        data.inventory.length
    ) {

        replier.reply(
            "❌ 잘못된 번호입니다."
        );

        return;
    }


    let fish =
        data.inventory[
            index - 1
        ];


    if (
        fish[4] !== true
    ) {

        replier.reply(
            "🔓 해당 물고기는 보관 중이 아닙니다."
        );

        return;
    }


    fish[4] = false;


    saveData();


    replier.reply(

        "🔓 보관 해제 완료!\n\n" +

        getGradeEmoji(
            fish[2]
        ) +

        " " +
        fish[0] +
        "cm " +
        fish[1] +

        "\n\n" +

        "이제 /전체판매 대상에 포함됩니다."

    );
}


// ==================================================
// 보관 목록
// ==================================================

function getProtectedFish(
    name
) {

    let inventory =
        userData[name]
            .inventory;


    let result =
        "🔒 " +
        name +
        "님의 보관 목록\n\n";


    let count = 0;


    for (
        let i = 0;
        i < inventory.length;
        i++
    ) {

        let fish =
            inventory[i];


        if (
            fish[4] === true
        ) {

            count++;


            let grade =
                fish[2] ||
                getFishGrade(
                    fish[1]
                );


            result +=

                (i + 1) +
                ". " +

                getGradeEmoji(
                    grade
                ) +

                " " +
                fish[0] +
                "cm " +
                fish[1] +

                " [" +
                grade +
                "]\n";
        }
    }


    if (
        count === 0
    ) {

        return (
            "🔒 현재 보관 중인 물고기가 없습니다.\n\n" +
            "/인벤토리에서 물고기를 선택해\n" +
            "/보관 <번호> 로 보관할 수 있습니다."
        );
    }


    result +=

        "\n━━━━━━━━━━━━━━\n" +

        "보관 물고기: " +
        count +
        "마리\n\n" +

        "🔒 보관된 물고기는\n" +
        "/전체판매에서 판매되지 않습니다.";


    return (
        "\u200b".repeat(1000) +
        result
    );
}


// ==================================================
// 물고기 판매
// ==================================================

function sellFish(
    name,
    index,
    replier
) {

    let data =
        userData[name];


    if (
        index < 1 ||
        index >
        data.inventory.length
    ) {

        replier.reply(
            "잘못된 번호입니다."
        );

        return;
    }


    let soldFish =
        data.inventory.splice(
            index - 1,
            1
        )[0];


    let fishName =
        soldFish[1];


    let grade =
        soldFish[2] ||
        getFishGrade(
            fishName
        );


    let price =
        soldFish[3] ||
        getFishPrice(
            fishName
        );


    let goldEarned =
        soldFish[0] *
        price;


    data.gold +=
        goldEarned;


    saveData();


    replier.reply(

        getGradeEmoji(
            grade
        ) +

        " [" +
        grade +
        "]\n" +

        soldFish[0] +
        "cm " +
        fishName +
        " 판매 완료!\n\n" +

        "💰 +" +
        goldEarned +
        "G\n" +

        "현재 골드: " +
        data.gold +
        "G"

    );
}


// ==================================================
// 전체 판매
//
// 🔒 보관된 물고기는 제외
// ==================================================

function sellAllFish(
    name,
    replier
) {

    let data =
        userData[name];


    if (
        data.inventory.length === 0
    ) {

        replier.reply(
            "🎒 인벤토리가 비어 있습니다."
        );

        return;
    }


    let totalGold = 0;

    let soldCount = 0;

    let protectedCount = 0;

    let newInventory = [];


    for (
        let i = 0;
        i < data.inventory.length;
        i++
    ) {

        let fish =
            data.inventory[i];


        // ==================================================
        // 보관 물고기
        // ==================================================

        if (
            fish[4] === true
        ) {

            newInventory.push(
                fish
            );


            protectedCount++;


            continue;
        }


        // ==================================================
        // 판매
        // ==================================================

        let price =
            fish[3] ||
            getFishPrice(
                fish[1]
            );


        totalGold +=
            fish[0] *
            price;


        soldCount++;
    }


    // ==================================================
    // 인벤토리 교체
    // ==================================================

    data.inventory =
        newInventory;


    data.gold +=
        totalGold;


    saveData();


    // ==================================================
    // 결과
    // ==================================================

    if (
        soldCount === 0
    ) {

        replier.reply(

            "🔒 판매할 물고기가 없습니다.\n\n" +

            "보관 중인 물고기 " +
            protectedCount +
            "마리는 보호되었습니다."

        );

        return;
    }


    let result =

        "💰 전체 판매 완료!\n\n" +

        "판매한 물고기: " +
        soldCount +
        "마리\n" +

        "판매 금액: " +
        totalGold +
        "G\n\n";


    if (
        protectedCount > 0
    ) {

        result +=

            "🔒 보관한 물고기: " +
            protectedCount +
            "마리\n" +

            "→ 보관 물고기는 판매되지 않았습니다.\n\n";
    }


    result +=

        "현재 골드: " +
        data.gold +
        "G";


    replier.reply(
        result
    );
}


// ==================================================
// 랭킹
// ==================================================

function getRank() {

    let ranking = [];


    for (
        let name in userData
    ) {

        if (
            userData[name].bestLength > 0
        ) {

            ranking.push({

                name: name,

                length:
                    Number(
                        userData[name]
                            .bestLength
                    )

            });
        }
    }


    ranking.sort(
        function(a, b) {

            return (
                b.length -
                a.length
            );
        }
    );


    if (
        ranking.length === 0
    ) {

        return (
            "아직 랭킹 기록이 없습니다."
        );
    }


    let result = "";


    for (
        let i = 0;
        i < ranking.length;
        i++
    ) {

        result +=

            (i + 1) +
            "위 " +

            ranking[i].name +

            " (" +
            ranking[i].length +
            "cm)\n\n";
    }


    return result;
}


// ==================================================
// 도박
// ==================================================

function gamble(
    name,
    betAmount,
    replier
) {

    let data =
        userData[name];


    if (
        betAmount > data.gold
    ) {

        replier.reply(

            "💰 골드가 부족합니다.\n" +

            "현재 골드: " +
            data.gold +
            "G"

        );

        return;
    }


    // 승률 45%
    let win =
        Math.random() < 0.45;


    if (
        win
    ) {

        data.gold +=
            betAmount;


        replier.reply(

            "🎰 도박 승리!\n\n" +

            "+" +
            betAmount +
            "G\n\n" +

            "현재 골드: " +
            data.gold +
            "G"

        );

    } else {

        data.gold -=
            betAmount;


        replier.reply(

            "🎰 도박 패배...\n\n" +

            "-" +
            betAmount +
            "G\n\n" +

            "현재 골드: " +
            data.gold +
            "G"

        );
    }


    saveData();
}


// ==================================================
// 도감
// ==================================================

function getBook(
    name
) {

    let data =
        userData[name];


    let discovered = 0;

    let currentGrade = "";


    let result =

        "📖 " +
        name +
        "님의 낚시 도감\n";


    for (
        let i = 0;
        i < fishs.length;
        i++
    ) {

        let fish =
            fishs[i];


        if (
            currentGrade !==
            fish.grade
        ) {

            currentGrade =
                fish.grade;


            result +=

                "\n" +

                getGradeEmoji(
                    fish.grade
                ) +

                " [" +
                fish.grade +
                "]\n";
        }


        let count =
            data.collection[
                fish.name
            ] || 0;


        if (
            count > 0
        ) {

            discovered++;


            result +=

                "✅ " +
                fish.name +
                " ×" +
                count +
                "\n";

        } else {

            result +=
                "❌ ???\n";
        }
    }


    let percent =
        Math.floor(
            (
                discovered /
                fishs.length
            ) * 100
        );


    result +=

        "\n━━━━━━━━━━━━━━\n" +

        "📚 발견: " +
        discovered +
        " / " +
        fishs.length +
        "\n" +

        "완성도: " +
        percent +
        "%";


    return (
        "\u200b".repeat(1000) +
        result
    );
}


// ==================================================
// 오늘 날짜
// ==================================================

function getToday() {

    let date =
        new Date();


    return (

        date.getFullYear() +
        "-" +

        String(
            date.getMonth() + 1
        ).padStart(2, "0") +

        "-" +

        String(
            date.getDate()
        ).padStart(2, "0")

    );
}


// ==================================================
// 출석
// ==================================================

function attendance(
    name,
    replier
) {

    let data =
        userData[name];


    let today =
        getToday();


    if (
        data.attendance.lastDate ===
        today
    ) {

        replier.reply(

            "🎁 오늘은 이미 출석했습니다.\n" +

            "연속 출석: " +

            data.attendance.streak +

            "일"

        );

        return;
    }


    let yesterdayDate =
        new Date();


    yesterdayDate.setDate(
        yesterdayDate.getDate() - 1
    );


    let yesterday =

        yesterdayDate.getFullYear() +
        "-" +

        String(
            yesterdayDate.getMonth() + 1
        ).padStart(2, "0") +

        "-" +

        String(
            yesterdayDate.getDate()
        ).padStart(2, "0");


    if (
        data.attendance.lastDate ===
        yesterday
    ) {

        data.attendance.streak++;

    } else {

        data.attendance.streak = 1;
    }


    data.attendance.lastDate =
        today;


    data.attendance.total++;


    // ==================================================
    // 기본 보상
    // ==================================================

    let reward = 1000;


    // 연속 출석 보너스
    reward +=

        (
            data.attendance.streak -
            1
        ) * 200;


    // 7일마다 추가 보너스
    if (
        data.attendance.streak % 7 === 0
    ) {

        reward += 5000;
    }


    data.gold +=
        reward;


    saveData();


    replier.reply(

        "🎁 출석 완료!\n\n" +

        "출석 횟수: " +
        data.attendance.total +
        "회\n" +

        "연속 출석: " +
        data.attendance.streak +
        "일\n\n" +

        "💰 보상: +" +
        reward +
        "G\n" +

        "현재 골드: " +
        data.gold +
        "G"

    );
}


// ==================================================
// 상점
// ==================================================

function shop(
    replier
) {

    let result =
        "🏪 낚시 상점\n\n";


    for (
        let i = 0;
        i < rods.length;
        i++
    ) {

        let rod =
            rods[i];


        result +=

            (i + 1) +
            ". 🎣 " +
            rod.name +
            "\n" +

            "가격: " +

            (
                rod.price === 0
                    ? "무료"
                    : rod.price + "G"
            ) +

            "\n" +

            "기본 크기 보너스: +" +

            (
                rod.bonus * 100
            ) +

            "%\n\n";
    }


    result +=

        "━━━━━━━━━━━━━━\n" +

        "/낚싯대구매 <번호>\n" +

        "/낚싯대\n" +

        "/낚싯대장착 <번호>\n" +

        "/강화\n" +

        "/낚싯대판매 <번호>";


    replier.reply(
        result
    );
}


// ==================================================
// 낚싯대 보유 여부
// ==================================================

function hasRod(
    data,
    id
) {

    return (

        data.rods[id] !== undefined &&
        data.rods[id] !== null

    );
}


// ==================================================
// 낚싯대 구매
// ==================================================

function buyRod(
    name,
    id,
    replier
) {

    let data =
        userData[name];


    if (
        id < 1 ||
        id > rods.length
    ) {

        replier.reply(
            "존재하지 않는 낚싯대입니다."
        );

        return;
    }


    // 이미 보유
    if (
        hasRod(
            data,
            id
        )
    ) {

        replier.reply(

            "🎣 이미 보유하고 있는 낚싯대입니다.\n" +
            "원하는 낚싯대는 /낚싯대장착 <번호> 로 장착하세요."

        );

        return;
    }


    let rod =
        rods[id - 1];


    if (
        data.gold <
        rod.price
    ) {

        replier.reply(

            "💰 골드가 부족합니다.\n\n" +

            "필요: " +
            rod.price +
            "G\n" +

            "현재: " +
            data.gold +
            "G"

        );

        return;
    }


    data.gold -=
        rod.price;


    data.rods[id] = {

        level: 0

    };


    saveData();


    replier.reply(

        "🎣 낚싯대 구매 완료!\n\n" +

        rod.name +
        " +0\n\n" +

        "기본 보너스: +" +

        (
            rod.bonus * 100
        ) +

        "%\n\n" +

        "남은 골드: " +
        data.gold +
        "G\n\n" +

        "/낚싯대장착 " +
        id +
        " 로 장착할 수 있습니다."

    );
}


// ==================================================
// 낚싯대 장착
// ==================================================

function equipRod(
    name,
    id,
    replier
) {

    let data =
        userData[name];


    if (
        id < 1 ||
        id > rods.length
    ) {

        replier.reply(
            "존재하지 않는 낚싯대입니다."
        );

        return;
    }


    if (
        !hasRod(
            data,
            id
        )
    ) {

        replier.reply(

            "❌ 해당 낚싯대를 보유하고 있지 않습니다.\n" +
            "/상점에서 구매할 수 있습니다."

        );

        return;
    }


    if (
        data.equippedRod === id
    ) {

        replier.reply(
            "🎣 이미 장착하고 있는 낚싯대입니다."
        );

        return;
    }


    data.equippedRod =
        id;


    saveData();


    let rod =
        rods[id - 1];


    let level =
        data.rods[id].level;


    replier.reply(

        "🔄 낚싯대 장착 완료!\n\n" +

        "🎣 " +
        rod.name +
        " +" +
        level +

        "\n\n" +

        "총 크기 보너스: +" +

        (
            getRodBonus(
                data
            ) * 100
        ) +

        "%"

    );
}


// ==================================================
// 낚싯대 목록
// ==================================================

function showRod(
    name,
    replier
) {

    let data =
        userData[name];


    let result =

        "🎣 " +
        name +
        "님의 낚싯대\n\n";


    let keys =
        Object.keys(
            data.rods
        );


    keys.sort(
        function(a, b) {

            return (
                parseInt(a) -
                parseInt(b)
            );

        }
    );


    for (
        let i = 0;
        i < keys.length;
        i++
    ) {

        let id =
            parseInt(
                keys[i]
            );


        let rod =
            rods[id - 1];


        if (
            !rod
        ) {

            continue;
        }


        let level =
            data.rods[id].level;


        let equipped =
            data.equippedRod === id;


        result +=

            id +
            ". 🎣 " +

            rod.name +

            " +" +
            level;


        if (
            equipped
        ) {

            result +=
                " ⭐ 장착";
        }


        result +=

            "\n" +

            "   기본 보너스: +" +

            (
                rod.bonus * 100
            ) +

            "%\n" +

            "   강화 보너스: +" +

            (
                level * 3
            ) +

            "%\n" +

            "   총 보너스: +" +

            (
                (
                    rod.bonus +
                    level * 0.03
                ) * 100
            ) +

            "%\n\n";
    }


    result +=

        "━━━━━━━━━━━━━━\n" +

        "/낚싯대장착 <번호>\n" +

        "/낚싯대판매 <번호>\n" +

        "/강화";


    replier.reply(
        result
    );
}


// ==================================================
// 현재 낚싯대 보너스
// ==================================================

function getRodBonus(
    data
) {

    let id =
        data.equippedRod;


    let rod =
        rods[id - 1];


    if (
        !rod
    ) {

        return 0;
    }


    let level =
        data.rods[id].level;


    return (

        rod.bonus +

        (
            level *
            0.03
        )

    );
}


// ==================================================
// 낚싯대 판매 가격
//
// 기본 가격 × 판매율
// + 강화 비용의 30%
// ==================================================

function getRodSellPrice(
    id,
    level
) {

    let rod =
        rods[id - 1];


    if (
        !rod
    ) {

        return 0;
    }


    let basePrice =
        Math.floor(
            rod.price *
            rod.sellRate
        );


    let upgradeCost = 0;


    for (
        let i = 1;
        i <= level;
        i++
    ) {

        upgradeCost +=
            rod.upgradePrice *
            i;
    }


    let upgradeReturn =
        Math.floor(
            upgradeCost *
            0.30
        );


    return (
        basePrice +
        upgradeReturn
    );
}


// ==================================================
// 낚싯대 판매
// ==================================================

function sellRod(
    name,
    id,
    replier
) {

    let data =
        userData[name];


    if (
        id < 1 ||
        id > rods.length
    ) {

        replier.reply(
            "존재하지 않는 낚싯대입니다."
        );

        return;
    }


    if (
        !hasRod(
            data,
            id
        )
    ) {

        replier.reply(
            "❌ 보유하고 있지 않은 낚싯대입니다."
        );

        return;
    }


    // ==================================================
    // 장착 중인 낚싯대 판매 방지
    // ==================================================

    if (
        data.equippedRod === id
    ) {

        replier.reply(

            "🚫 현재 장착 중인 낚싯대는 판매할 수 없습니다.\n" +
            "다른 낚싯대를 장착한 후 판매하세요."

        );

        return;
    }


    let level =
        data.rods[id].level;


    let rod =
        rods[id - 1];


    let sellPrice =
        getRodSellPrice(
            id,
            level
        );


    delete data.rods[id];


    data.gold +=
        sellPrice;


    saveData();


    replier.reply(

        "💰 낚싯대 중고 판매 완료!\n\n" +

        "🎣 " +
        rod.name +
        " +" +
        level +

        "\n\n" +

        "판매 금액: " +
        sellPrice +
        "G\n" +

        "현재 골드: " +
        data.gold +
        "G"

    );
}


// ==================================================
// 강화 비용
// ==================================================

function getUpgradePrice(
    data
) {

    let id =
        data.equippedRod;


    let rod =
        rods[id - 1];


    if (
        !rod
    ) {

        return 999999999;
    }


    let level =
        data.rods[id].level;


    return (

        rod.upgradePrice *

        (
            level + 1
        )

    );
}


// ==================================================
// 강화
// ==================================================

function upgradeRod(
    name,
    replier
) {

    let data =
        userData[name];


    let id =
        data.equippedRod;


    let rod =
        rods[id - 1];


    if (
        !rod
    ) {

        replier.reply(
            "⚠️ 낚싯대 정보를 찾을 수 없습니다."
        );

        return;
    }


    let rodData =
        data.rods[id];


    let level =
        rodData.level;


    // ==================================================
    // 최대 강화
    // ==================================================

    if (
        level >= 10
    ) {

        replier.reply(
            "🎣 낚싯대는 +10까지 강화할 수 있습니다."
        );

        return;
    }


    let price =
        getUpgradePrice(
            data
        );


    if (
        data.gold <
        price
    ) {

        replier.reply(

            "💰 골드가 부족합니다.\n\n" +

            "강화 비용: " +
            price +
            "G\n" +

            "현재 골드: " +
            data.gold +
            "G"

        );

        return;
    }


    // ==================================================
    // 비용 차감
    // ==================================================

    data.gold -=
        price;


    // ==================================================
    // 확률
    // ==================================================

    let rate =
        upgradeRates[level];


    let random =
        Math.random() * 100;


    // ==================================================
    // 성공
    // ==================================================

    if (
        random <
        rate.success
    ) {

        rodData.level++;


        saveData();


        replier.reply(

            "🔨 강화 성공!\n\n" +

            "🎣 " +
            rod.name +

            " +" +
            level +
            " → +" +
            rodData.level +

            "\n\n" +

            "성공 확률: " +
            rate.success +
            "%\n" +

            "실패 확률: " +
            rate.fail +
            "%\n" +

            "파괴 확률: " +
            rate.destroy +
            "%\n\n" +

            "📈 총 크기 보너스: +" +

            (
                getRodBonus(
                    data
                ) * 100
            ) +

            "%\n\n" +

            "💰 남은 골드: " +
            data.gold +
            "G"

        );

        return;
    }


    // ==================================================
    // 실패
    // ==================================================

    if (
        random <
        rate.success +
        rate.fail
    ) {

        saveData();


        replier.reply(

            "💥 강화 실패...\n\n" +

            "🎣 " +
            rod.name +

            " +" +
            level +

            " 유지\n\n" +

            "성공 확률: " +
            rate.success +
            "%\n" +

            "실패 확률: " +
            rate.fail +
            "%\n" +

            "파괴 확률: " +
            rate.destroy +
            "%\n\n" +

            "💰 남은 골드: " +
            data.gold +
            "G"

        );

        return;
    }


    // ==================================================
    // 파괴
    // ==================================================

    delete data.rods[id];


    // ==================================================
    // 다른 낚싯대 자동 장착
    // ==================================================

    let keys =
        Object.keys(
            data.rods
        );


    if (
        keys.length === 0
    ) {

        // 전부 없어지는 것을 방지
        data.rods[1] = {

            level: 0

        };


        data.equippedRod = 1;

    } else {

        keys.sort(
            function(a, b) {

                return (
                    parseInt(a) -
                    parseInt(b)
                );

            }
        );


        data.equippedRod =
            parseInt(
                keys[0]
            );
    }


    saveData();


    let newRod =
        rods[
            data.equippedRod - 1
        ];


    let newRodLevel =
        data.rods[
            data.equippedRod
        ].level;


    replier.reply(

        "💥💥 낚싯대가 파괴되었습니다!\n\n" +

        "🎣 " +
        rod.name +

        " +" +
        level +

        "\n\n" +

        "성공 확률: " +
        rate.success +
        "%\n" +

        "실패 확률: " +
        rate.fail +
        "%\n" +

        "파괴 확률: " +
        rate.destroy +
        "%\n\n" +

        "⚠️ 해당 낚싯대는 사라졌습니다.\n\n" +

        "현재 장착 낚싯대: " +
        newRod.name +
        " +" +
        newRodLevel

    );

    // ==================================================
// 골드 송금
// ==================================================

function transferGold(
    sender,
    target,
    amount,
    replier
) {

    let senderData =
        userData[sender];


    // ==================================================
    // 자기 자신에게 송금 방지
    // ==================================================

    if (
        sender === target
    ) {

        replier.reply(
            "❌ 자기 자신에게 송금할 수 없습니다."
        );

        return;
    }


    // ==================================================
    // 존재하지 않는 유저
    // ==================================================

    if (
        !Object.prototype.hasOwnProperty.call(
            userData,
            target
        )
    ) {

        replier.reply(

            "❌ 해당 유저를 찾을 수 없습니다.\n\n" +

            "상대방이 먼저 봇을 사용해야\n" +
            "송금할 수 있습니다."

        );

        return;
    }


    // ==================================================
    // 금액 확인
    // ==================================================

    if (
        isNaN(amount) ||
        amount <= 0
    ) {

        replier.reply(
            "❌ 올바른 금액을 입력해주세요."
        );

        return;
    }


    amount =
        Math.floor(
            amount
        );


    // ==================================================
    // 보유 골드 확인
    // ==================================================

    if (
        senderData.gold <
        amount
    ) {

        replier.reply(

            "💰 골드가 부족합니다.\n\n" +

            "현재 골드: " +
            senderData.gold +
            "G"

        );

        return;
    }


    // ==================================================
    // 송금
    // ==================================================

    senderData.gold -=
        amount;


    userData[target].gold +=
        amount;


    saveData();


    replier.reply(

        "💸 송금 완료!\n\n" +

        "보낸 사람: " +
        sender +
        "\n" +

        "받는 사람: " +
        target +
        "\n\n" +

        "💰 송금 금액: " +
        amount +
        "G\n\n" +

        "현재 골드: " +
        senderData.gold +
        "G"

    );
}
}
// ==================================================
// 슬롯머신
// ==================================================

function slotMachine(
    name,
    betAmount,
    replier
) {

    let data = userData[name];


    if (!data) {

        replier.reply(
            "❌ 유저 데이터를 찾을 수 없습니다."
        );

        return;
    }


    if (betAmount > data.gold) {

        replier.reply(
            "💰 골드가 부족합니다.\n\n" +
            "현재 골드: " +
            data.gold +
            "G"
        );

        return;
    }


    let symbols = [
        "🐟",
        "🐡",
        "🦈",
        "💎",
        "⭐",
        "🍀"
    ];


    let slot1 =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];

    let slot2 =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];

    let slot3 =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];


    let multiplier = 0;
    let result = "💥 꽝!";


    // 3개 모두 동일
    if (
        slot1 === slot2 &&
        slot2 === slot3
    ) {

        if (
            slot1 === "💎"
        ) {

            multiplier = 10;
            result =
                "💎💎💎 JACKPOT!!!";

        } else if (
            slot1 === "⭐"
        ) {

            multiplier = 5;
            result =
                "⭐⭐⭐ 대박!";

        } else {

            multiplier = 3;
            result =
                "🎉 3개 일치!";
        }

    }

    // 2개 동일
    else if (
        slot1 === slot2 ||
        slot1 === slot3 ||
        slot2 === slot3
    ) {

        multiplier = 1.5;
        result =
            "✨ 2개 일치!";
    }


    // 먼저 배팅금 차감
    data.gold -= betAmount;


    // 당첨금 계산
    let reward =
        Math.floor(
            betAmount *
            multiplier
        );


    data.gold += reward;


    let profit =
        reward -
        betAmount;


    let message =
        "🎰 슬롯머신\n\n" +

        "┌─────────┐\n" +
        "  " +
        slot1 +
        " | " +
        slot2 +
        " | " +
        slot3 +
        "\n" +
        "└─────────┘\n\n" +

        result +
        "\n\n";


    if (profit > 0) {

        message +=
            "💰 +" +
            profit +
            "G";

    } else {

        message +=
            "💀 -" +
            betAmount +
            "G";
    }


    message +=
        "\n\n현재 골드: " +
        data.gold +
        "G";


    replier.reply(message);


    saveData();
}
// ==================================================
// 블랙잭 카드 뽑기
// ==================================================

function drawBlackjackCard() {

    let number =
        Math.floor(
            Math.random() * 13
        ) + 1;


    if (number === 1) {

        return {
            name: "A",
            value: 11
        };
    }


    if (number >= 11) {

        let names = {
            11: "J",
            12: "Q",
            13: "K"
        };

        return {
            name: names[number],
            value: 10
        };
    }


    return {
        name: String(number),
        value: number
    };
}


// ==================================================
// 블랙잭 점수 계산
// ==================================================

function getBlackjackScore(cards) {

    let score = 0;
    let aceCount = 0;


    for (
        let i = 0;
        i < cards.length;
        i++
    ) {

        score +=
            cards[i].value;


        if (
            cards[i].name === "A"
        ) {

            aceCount++;
        }
    }


    while (
        score > 21 &&
        aceCount > 0
    ) {

        score -= 10;
        aceCount--;
    }


    return score;
}


// ==================================================
// 카드 표시
// ==================================================

function showCards(cards) {

    let text = "";

    for (
        let i = 0;
        i < cards.length;
        i++
    ) {

        text +=
            "🂠" +
            cards[i].name +
            " ";
    }

    return text;
}


// ==================================================
// 블랙잭 시작
// ==================================================

function startBlackjack(
    name,
    betAmount,
    replier
) {

    let data =
        userData[name];


    if (!data) {

        replier.reply(
            "❌ 유저 데이터를 찾을 수 없습니다."
        );

        return;
    }


    if (
        blackjackGames[name]
    ) {

        replier.reply(
            "🃏 이미 블랙잭 게임을 진행 중입니다!\n\n" +
            "/히트 또는 /스탠드를 사용하세요."
        );

        return;
    }


    if (
        betAmount > data.gold
    ) {

        replier.reply(
            "💰 골드가 부족합니다."
        );

        return;
    }


    // 배팅금 먼저 차감
    data.gold -= betAmount;


    let playerCards = [
        drawBlackjackCard(),
        drawBlackjackCard()
    ];


    let dealerCards = [
        drawBlackjackCard(),
        drawBlackjackCard()
    ];


    blackjackGames[name] = {

        bet: betAmount,

        playerCards:
            playerCards,

        dealerCards:
            dealerCards
    };


    let score =
        getBlackjackScore(
            playerCards
        );


    // 처음부터 블랙잭
    if (score === 21) {

        finishBlackjack(
            name,
            true,
            replier
        );

        return;
    }


    replier.reply(

        "🃏 블랙잭 시작!\n\n" +

        "👤 내 카드\n" +
        showCards(playerCards) +
        "\n점수: " +
        score +
        "\n\n" +

        "🤖 딜러\n" +
        "🂠" +
        dealerCards[0].name +
        " ❓\n\n" +

        "/히트 → 카드 받기\n" +
        "/스탠드 → 멈추기"
    );


    saveData();
}


// ==================================================
// 블랙잭 히트
// ==================================================

function blackjackHit(
    name,
    replier
) {

    let game =
        blackjackGames[name];


    if (!game) {

        replier.reply(
            "🃏 진행 중인 블랙잭 게임이 없습니다."
        );

        return;
    }


    let card =
        drawBlackjackCard();


    game.playerCards.push(
        card
    );


    let score =
        getBlackjackScore(
            game.playerCards
        );


    if (score > 21) {

        replier.reply(

            "💥 버스트!\n\n" +

            "카드: " +
            showCards(
                game.playerCards
            ) +

            "\n점수: " +
            score +
            "\n\n" +

            "💀 패배!\n" +
            "-" +
            game.bet +
            "G"
        );


        delete blackjackGames[name];


        saveData();

        return;
    }


    if (score === 21) {

        blackjackStand(
            name,
            replier
        );

        return;
    }


    replier.reply(

        "🃏 카드를 받았습니다!\n\n" +

        showCards(
            game.playerCards
        ) +

        "\n점수: " +
        score +
        "\n\n" +

        "/히트 또는 /스탠드"
    );
}


// ==================================================
// 블랙잭 스탠드
// ==================================================

function blackjackStand(
    name,
    replier
) {

    let game =
        blackjackGames[name];


    if (!game) {

        replier.reply(
            "🃏 진행 중인 블랙잭 게임이 없습니다."
        );

        return;
    }


    // 딜러는 17점 이상까지 카드
    while (
        getBlackjackScore(
            game.dealerCards
        ) < 17
    ) {

        game.dealerCards.push(
            drawBlackjackCard()
        );
    }


    let playerScore =
        getBlackjackScore(
            game.playerCards
        );

    let dealerScore =
        getBlackjackScore(
            game.dealerCards
        );


    let result = "";
    let reward = 0;


    if (dealerScore > 21) {

        reward =
            game.bet * 2;

        result =
            "🎉 딜러 버스트!\n승리!";

    }

    else if (
        playerScore >
        dealerScore
    ) {

        reward =
            game.bet * 2;

        result =
            "🎉 승리!";

    }

    else if (
        playerScore ===
        dealerScore
    ) {

        reward =
            game.bet;

        result =
            "🤝 무승부!\n배팅금을 돌려받았습니다.";

    }

    else {

        result =
            "💀 패배...";
    }


    userData[name].gold +=
        reward;


    replier.reply(

        "🃏 블랙잭 결과\n\n" +

        "👤 " +
        showCards(
            game.playerCards
        ) +
        "\n점수: " +
        playerScore +

        "\n\n🤖 " +
        showCards(
            game.dealerCards
        ) +
        "\n점수: " +
        dealerScore +

        "\n\n" +
        result +

        "\n\n💰 현재 골드: " +
        userData[name].gold +
        "G"
    );


    delete blackjackGames[name];


    saveData();
}


// ==================================================
// 처음 블랙잭 처리
// ==================================================

function finishBlackjack(
    name,
    isBlackjack,
    replier
) {

    let game =
        blackjackGames[name];


    if (!game) return;


    let reward =
        Math.floor(
            game.bet * 2.5
        );


    userData[name].gold +=
        reward;


    replier.reply(

        "🎉 BLACKJACK!\n\n" +

        showCards(
            game.playerCards
        ) +

        "\n점수: 21\n\n" +

        "💰 획득: +" +
        (
            reward -
            game.bet
        ) +
        "G\n\n" +

        "현재 골드: " +
        userData[name].gold +
        "G"
    );


    delete blackjackGames[name];


    saveData();
}

// ==================================================
// 물고기 레이스 생성
// ==================================================

function createRace(
    room,
    host,
    betAmount,
    replier
) {

    // 이미 레이스가 있는지 확인
    if (raceGames[room]) {

        replier.reply(
            "🐟 이미 진행 중인 물고기 레이스가 있습니다!\n\n" +
            "/레이스현황 으로 확인하세요."
        );

        return;
    }


    // 유저 확인
    if (!userData[host]) {

        replier.reply(
            "❌ 유저 데이터를 찾을 수 없습니다."
        );

        return;
    }


    // 골드 확인
    if (
        betAmount >
        userData[host].gold
    ) {

        replier.reply(
            "💰 골드가 부족합니다.\n\n" +
            "현재 골드: " +
            userData[host].gold +
            "G"
        );

        return;
    }


    // 잭팟 데이터 확인
    if (
        userData.__system.raceJackpots[room] === undefined
    ) {

        userData.__system.raceJackpots[room] = 0;
    }


    // 레이스 생성
    raceGames[room] = {

        host: host,

        bet: betAmount,

        players: {}

    };


    replier.reply(

        "🏁 🐟 물고기 레이스 참가 모집!\n\n" +

        "👑 방장: " +
        host +
        "\n\n" +

        "💰 참가비: " +
        betAmount +
        "G\n\n" +

        "🔥 현재 이월 잭팟: " +
        userData.__system.raceJackpots[room] +
        "G\n\n" +

        "🐟 출전 물고기\n\n" +

        "1️⃣ 🐠 금붕어\n" +
        "2️⃣ 🐡 복어\n" +
        "3️⃣ 🦈 상어\n" +
        "4️⃣ 🐙 문어\n" +
        "5️⃣ 🐬 돌고래\n\n" +

        "📌 참가 방법\n" +
        "/참가 <번호>\n\n" +

        "예시: /참가 3\n\n" +

        "⚠️ 같은 물고기를 여러 명이 선택할 수 있습니다!\n\n" +

        "방장이 /게임시작 하면 시작됩니다."
    );
}


// ==================================================
// 물고기 레이스 참가
// ==================================================

function joinRace(
    room,
    name,
    fishNumber,
    replier
) {

    let game =
        raceGames[room];


    // 레이스 확인
    if (!game) {

        replier.reply(
            "❌ 현재 진행 중인 레이스가 없습니다."
        );

        return;
    }


    // 유저 확인
    if (!userData[name]) {

        replier.reply(
            "❌ 유저 데이터를 찾을 수 없습니다."
        );

        return;
    }


    // 이미 참가했는지 확인
    if (
        game.players[name] !== undefined
    ) {

        replier.reply(
            "⚠️ 이미 레이스에 참가했습니다!"
        );

        return;
    }


    // 골드 확인
    if (
        userData[name].gold <
        game.bet
    ) {

        replier.reply(

            "💰 골드가 부족합니다.\n\n" +

            "참가비: " +
            game.bet +
            "G\n" +

            "현재 골드: " +
            userData[name].gold +
            "G"
        );

        return;
    }


    // 참가비 차감
    userData[name].gold -=
        game.bet;


    // 선택한 물고기 저장
    game.players[name] =
        fishNumber - 1;


    let fish =
        RACE_FISH[
            fishNumber - 1
        ];


    replier.reply(

        "🐟 레이스 참가 완료!\n\n" +

        "👤 참가자: " +
        name +
        "\n\n" +

        "🐟 선택한 물고기:\n" +

        fish.emoji +
        " " +
        fish.name +
        "\n\n" +

        "💰 참가비: -" +
        game.bet +
        "G\n\n" +

        "현재 골드: " +
        userData[name].gold +
        "G"
    );


    saveData();
}


// ==================================================
// 물고기 레이스 현황
// ==================================================

function showRaceStatus(
    room,
    replier
) {

    let game =
        raceGames[room];


    if (!game) {

        replier.reply(
            "🐟 현재 진행 중인 레이스가 없습니다."
        );

        return;
    }


    let message =

        "🏁 🐟 물고기 레이스 현황\n\n" +

        "👑 방장: " +
        game.host +
        "\n\n" +

        "💰 참가비: " +
        game.bet +
        "G\n\n" +

        "🔥 이월 잭팟: " +
        (
            userData.__system.raceJackpots[room] ||
            0
        ) +
        "G\n\n";


    for (
        let i = 0;
        i < RACE_FISH.length;
        i++
    ) {

        let fish =
            RACE_FISH[i];


        let players = [];


        for (
            let name in game.players
        ) {

            if (
                game.players[name] === i
            ) {

                players.push(
                    name
                );
            }
        }


        message +=

            (i + 1) +
            "️⃣ " +

            fish.emoji +
            " " +
            fish.name +
            "\n";


        if (
            players.length === 0
        ) {

            message +=
                "   └ 선택한 사람 없음\n\n";

        } else {

            message +=
                "   └ " +
                players.join(", ") +
                "\n\n";
        }
    }


    let playerCount =

        Object.keys(
            game.players
        ).length;


    message +=

        "👥 현재 참가자: " +
        playerCount +
        "명\n\n" +

        "👑 방장이 /게임시작 하면 시작됩니다.";


    replier.reply(
        message
    );
}


// ==================================================
// 물고기 레이스 시작
// ==================================================

function startRace(
    room,
    name,
    replier
) {

    let game =
        raceGames[room];


    // 레이스 확인
    if (!game) {

        replier.reply(
            "❌ 진행 중인 레이스가 없습니다."
        );

        return;
    }


    // 방장 확인
    if (
        name !==
        game.host
    ) {

        replier.reply(
            "⚠️ 레이스 방장만 게임을 시작할 수 있습니다."
        );

        return;
    }


    let playerNames =

        Object.keys(
            game.players
        );


    // 최소 2명
    if (
        playerNames.length < 2
    ) {

        replier.reply(
            "👥 최소 2명 이상 참가해야 합니다!"
        );

        return;
    }


    // ==================================================
    // 랜덤 우승 물고기
    // ==================================================

    let winnerFishIndex =

        Math.floor(
            Math.random() *
            RACE_FISH.length
        );


    let winnerFish =

        RACE_FISH[
            winnerFishIndex
        ];


    // ==================================================
    // 우승자 찾기
    // ==================================================

    let winners = [];


    for (
        let i = 0;
        i < playerNames.length;
        i++
    ) {

        let playerName =
            playerNames[i];


        if (
            game.players[playerName] ===
            winnerFishIndex
        ) {

            winners.push(
                playerName
            );
        }
    }


    // ==================================================
    // 참가비 총액
    // ==================================================

    let totalBet =

        playerNames.length *
        game.bet;


    // 카지노 수수료
    let fee =

        Math.floor(
            totalBet *
            CASINO_FEE_RATE
        );


    // 기본 상금
    let prizePool =

        totalBet -
        fee;


    // 기존 이월 잭팟
    let jackpot =

        userData.__system
            .raceJackpots[room] ||
        0;


    // 기존 잭팟 합치기
    prizePool +=
        jackpot;


    // ==================================================
    // 카지노 수수료 지급
    // ==================================================

    if (
        userData[CASINO_OWNER]
    ) {

        userData[CASINO_OWNER].gold +=
            fee;
    }


    // ==================================================
    // 결과 메시지
    // ==================================================

    let message =

        "🏁 🐟 물고기 레이스 결과!\n\n" +

        "🥇 우승 물고기\n\n" +

        winnerFish.emoji +
        " " +
        winnerFish.name +
        "\n\n" +

        "💰 총 참가비: " +
        totalBet +
        "G\n" +

        "🏦 카지노 수수료: " +
        fee +
        "G\n" +

        "👑 카지노 주인 " +
        CASINO_OWNER +
        ": +" +
        fee +
        "G\n\n";


    // ==================================================
    // 아무도 우승하지 못함
    // ==================================================

    if (
        winners.length === 0
    ) {

        // 상금 이월
        userData.__system
            .raceJackpots[room] =

            prizePool;


        message +=

            "😱 우승 물고기를 선택한 사람이 없습니다!\n\n" +

            "🔥 상금이 다음 레이스로 이월됩니다!\n\n" +

            "💰 다음 레이스 잭팟: " +

            userData.__system
                .raceJackpots[room] +

            "G";


        // 게임 삭제
        delete raceGames[room];


        replier.reply(
            message
        );


        saveData();

        return;
    }


    // ==================================================
    // 우승자 존재
    // ==================================================

    // 잭팟 초기화
    userData.__system
        .raceJackpots[room] = 0;


    // 1명당 상금
    let reward =

        Math.floor(
            prizePool /
            winners.length
        );


    // 나머지 골드
    let remainder =

        prizePool %
        winners.length;


    // 우승자 상금 지급
    for (
        let i = 0;
        i < winners.length;
        i++
    ) {

        let winner =
            winners[i];


        if (
            userData[winner]
        ) {

            userData[winner].gold +=
                reward;
        }
    }


    // ==================================================
    // 남은 골드 처리
    // ==================================================

    if (
        remainder > 0
    ) {

        userData.__system
            .raceJackpots[room] =

            remainder;
    }


    // ==================================================
    // 우승자 표시
    // ==================================================

    message +=

        "🏆 우승자\n\n";


    for (
        let i = 0;
        i < winners.length;
        i++
    ) {

        message +=

            "🎉 " +
            winners[i] +
            "\n";
    }


    message +=

        "\n💰 총 상금: " +
        prizePool +
        "G\n\n" +

        "👥 우승자: " +
        winners.length +
        "명\n\n" +

        "💵 1인당 상금: " +
        reward +
        "G";


    if (
        remainder > 0
    ) {

        message +=

            "\n\n🔥 남은 " +
            remainder +
            "G는 다음 레이스 잭팟으로 이월됩니다!";
    }


    // 게임 종료
    delete raceGames[room];


    replier.reply(
        message
    );


    saveData();
}

// ==================================================
// 🎣 끝
// ==================================================