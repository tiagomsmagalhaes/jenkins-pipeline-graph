(function() {
  'use strict';
  angular
  .module('jenkins-pipeline-graph',[])
  .directive('jenkinsPipelineGraph', jenkinsPipelineGraph);


  jenkinsPipelineGraph.$inject = [];
  function jenkinsPipelineGraph() {

    return {
      restrict: 'E',
      scope: {},
      link: linking,
      controllerAs: 'ctrl',
      controller: graphController,
      bindToController: true,
      templateUrl: '../src/jenkinsPipelineGraph.html',
      replace: true,
    }

    linking.$inject = ['scope', 'elem', 'attrs'];
    function linking(scope, elem, attrs) {
      // console.log(elem[0]);

      scope.ctrl.svgElem = elem[0].children[0];
      scope.ctrl.svgElem.setAttribute('height', elem[0].offsetHeight)
      scope.ctrl.svgElem.setAttribute('width', elem[0].offsetWidth)

      scope.ctrl.init()

    }
    graphController.$inject = [];
    function graphController() {
      var vm = this;
      vm.svgns = "http://www.w3.org/2000/svg";
      vm.init = init;
      vm.addNode = addNode;


      vm.defaultLayout = {
        nodeSpacingH: 120,
        nodeSpacingV: 70,
        nodeRadius: 11,
        startRadius: 7.5,
        dotRadius: 3.4,
        curveRadius: 12,
        connectorStrokeWidth: 3.2,
        addStrokeWidth: 1.7,
        labelOffsetV: 25,
        smallLabelOffsetV: 20
      }


      function init() {
        let startCircle = document.createElementNS(this.svgns, 'circle')
        startCircle.setAttributeNS(null, 'r', this.defaultLayout.startRadius)
        startCircle.setAttributeNS(null, 'class', 'start-node')
        startCircle.setAttributeNS(null, 'stroke', 'none')
        startCircle.setAttributeNS(null, 'cx', this.svgElem.parentElement.offsetWidth/2)
        startCircle.setAttributeNS(null, 'cy', this.svgElem.parentElement.offsetHeight/2)
        this.svgElem.appendChild(startCircle)

        let plusNode = document.createElementNS(this.svgns, 'circle')
        plusNode.setAttributeNS(null, 'r', this.defaultLayout.nodeRadius)
        // plusNode.setAttributeNS(null, 'class', 'start-node')
        // plusNode.setAttributeNS(null, 'stroke', 'none')
        plusNode.setAttributeNS(null, 'stroke', 'black')
        plusNode.setAttributeNS(null, 'cx', (this.svgElem.parentElement.offsetWidth/2) + this.defaultLayout.nodeSpacingH)
        plusNode.setAttributeNS(null, 'cy', this.svgElem.parentElement.offsetHeight/2)
        angular.element(plusNode).on('click', this.addNode)
        this.svgElem.appendChild(plusNode)

      }

      function addNode(ev) {
        console.log(ev.srcElement);
      }


    }
  }
}());
