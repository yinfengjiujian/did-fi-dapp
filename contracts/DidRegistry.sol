// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract DidRegistry {
    struct DidInfo {
        string nickname; // 用户昵称
        string metadataURI; // IPFS 元数据地址 (存储头像、简介、链接等)
        uint256 registeredAt; // 注册时间戳
        bool exists; // 身份是否激活
    }

    mapping(address => DidInfo) private didUserMap;
    mapping(string => address) private nicknameToAddress; // 按昵称查询
    address[] private registeredUsers; // 用于遍历

    // ===== 事件定义 =====
    event DidRegistered(
        address indexed user,
        string nickname,
        uint256 timestamp
    );
    event DidUpdated(address indexed user, string nickname, uint256 timestamp);

    /**
     * 注册DID用户函数入口
     */
    function registerDID(
        string calldata _nickname,
        string calldata _metadataURI
    ) external {
        // 如果已经注册过了那么不能再注册
        require(!didUserMap[msg.sender].exists, "DID already registered");

        // 昵称唯一性检查，
        require(
            nicknameToAddress[_nickname] == address(0),
            "Nickname already taken"
        );

        // 参数验证
        require(
            bytes(_nickname).length > 0 && bytes(_nickname).length <= 32,
            "Invalid nickname length"
        );
        require(bytes(_metadataURI).length > 0, "Metadata URI cannot be empty");

        // 存储注册对象到Map中
        didUserMap[msg.sender] = DidInfo({
            nickname: _nickname,
            metadataURI: _metadataURI,
            registeredAt: block.timestamp,
            exists: true
        });
        // 记录昵称占用
        nicknameToAddress[_nickname] = msg.sender;
        // 添加到用户列表
        registeredUsers.push(msg.sender);

        emit DidRegistered(msg.sender, _nickname, block.timestamp);
    }

    /**
     * 更新DID信息
     */
    function updateDidInfo(
        string calldata _nickname,
        string calldata _metadataURI
    ) external {
        // 参数验证
        require(
            bytes(_nickname).length > 0 && bytes(_nickname).length <= 32,
            "Invalid nickname length"
        );
        require(bytes(_metadataURI).length > 0, "Metadata URI cannot be empty");

        // 更新，先看是否存在这个用户
        require(didUserMap[msg.sender].exists, "DID not registered");

        // 更新的昵称是否合法
        string memory oldNickname = didUserMap[msg.sender].nickname;

        if (keccak256(bytes(_nickname)) != keccak256(bytes(oldNickname))) {
            // 检查更新的昵称是否已经被占用
            require(
                nicknameToAddress[_nickname] == address(0),
                "Nickname already taken"
            );

            delete nicknameToAddress[oldNickname];
            nicknameToAddress[_nickname] = msg.sender;
        }

        // 更新信息
        didUserMap[msg.sender].nickname = _nickname;
        didUserMap[msg.sender].metadataURI = _metadataURI;

        emit DidUpdated(msg.sender, _nickname, block.timestamp);
    }

    /**
     * 查询DID信息
     */
    function getDidInfo(address _user) external view returns (DidInfo memory) {
        require(didUserMap[_user].exists, "DID not registered");
        // 返回用户的DID信息
        return didUserMap[_user];
    }

    /**
     * 查询自己的DID信息
     */
    function getMyDid() external view returns (DidInfo memory) {
        require(didUserMap[msg.sender].exists, "DID not registered");
        return didUserMap[msg.sender];
    }

    /**
     * 判断该地址是否已经注册
     */
    function isRegistered(address _user) external view returns (bool) {
        return didUserMap[_user].exists;
    }

    /**
     * 获取总共注册的用户数量
     */
    function getUserCount() external view returns (uint256) {
        return registeredUsers.length;
    }

    /**
     * 获取所有注册用户的地址
     */
    function getAllUsers() external view returns (address[] memory) {
        return registeredUsers;
    }

    // 分页查询，避免返回大数组
    function getUsersPaginated(
        uint256 _offset,
        uint256 _limit
    ) external view returns (address[] memory) {
        require(_offset < registeredUsers.length, "Offset out of bounds");

        uint256 end = _offset + _limit;
        if (end > registeredUsers.length) {
            end = registeredUsers.length;
        }

        address[] memory result = new address[](end - _offset);
        for (uint256 i = _offset; i < end; i++) {
            result[i - _offset] = registeredUsers[i];
        }

        return result;
    }

    // 批量查询，减少多次调用
    function getBatchDidInfo(
        address[] calldata _users
    ) external view returns (DidInfo[] memory) {
        DidInfo[] memory results = new DidInfo[](_users.length);
        for (uint256 i = 0; i < _users.length; i++) {
            if (didUserMap[_users[i]].exists) {
                results[i] = didUserMap[_users[i]];
            }
        }
        return results;
    }
}
