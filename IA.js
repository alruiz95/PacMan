function Tree() {
    var self = this;
    var root;
    
    function search(posX, posY, baseNode = root){
        if (baseNode == null){
            return null;
        }

        if (baseNode.posX == posX && baseNode.posY == posY)
            return baseNode;
        
        restLeft = search(posX,posY, baseNode.left);
        restRight = search(posX,posY, baseNode.right);
        restDown = restsearch(posX,posY, baseNode.down);
        restUp = search(posX,posY, baseNode.up);

        if (restLeft != null)
            return restLeft;
        if (restRight != null)
            return restRight;
        if (restDown != null)
            return restDown;
        if (restUp != null)
            return restUp;
        
        return null;
    };

    function add(posXB, posYB,posX,posY, ifGhost, nivel) {
        /*if(typeof value === 'undefined') {
            throw new Error('value cannot be undefined');
        }*/
        var node = new TreeNode(posX,posY, ifGhost, nivel);
        if(!root) {
            root = node;
            return;
        }   

        var resultBefore = search(posXB,posYB);

        if(posX < resultBefore.posX && posY == resultBefore.posY)
            resultBefore.left = node;

        if(posX == resultBefore.posX && posY < resultBefore.posY)
            resultBefore.down = node;

        if(posX == resultBefore.posX && posY > resultBefore.posY)
            resultBefore.up = node;

        if(posX > resultBefore.posX && posY == resultBefore.posY)
            resultBefore.right = node;
    };

    self.root = function (){
        return root;
    };    

    function printTree(baseNode = root, printPrefix = ""){
        if (baseNode == null){
            return;
        }

        console.log(printPrefix + " Nodo: Pos->" + baseNode.posX + "," + baseNode.posY);

        printTree(baseNode.left, printPrefix + "-");
        printTree(baseNode.down, printPrefix + "-");
        printTree(baseNode.up, printPrefix + "-");
        printTree(baseNode.right, printPrefix + "-");
    };

    printTheTree = function(){
        printTree();
    };
    
    function TreeNode( posX,posY, ifGhost, nivel) {
        this.posX = posX;
        this.posY = posY;
        this.ifGhost = ifGhost;
        this.nivel = nivel;
        this.left = null;
        this.right = null;
        this.down = null;
        this.up = null
    };
};


Tree.add(0, 0, 5, 5, false, 0);
Tree.add(5, 5, 4, 5, false, 1);
Tree.add(5, 5, 5, 4, false, 1);
Tree.add(5, 5, 6, 5, false, 1);
Tree.add(5, 5, 5, 6, false, 1);

Tree.printTheTree();